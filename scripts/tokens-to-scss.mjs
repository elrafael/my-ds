#!/usr/bin/env node
// Converte os JSON de tokens exportados do Figma (formato DTCG) em parciais SCSS,
// um .scss por cada .json.
//
// Suporta primitivos e tokens semânticos (modos Light/Dark, Size, etc.),
// resolvendo referências cruzadas através de $extensions["com.figma.aliasData"]
// para que tokens semânticos fiquem vinculados às variáveis primitivas correspondentes.
//
// Uso (a partir da raiz do projeto Stencil):
//   node scripts/tokens-to-scss.mjs [pastaJson] [pastaScss]
//   node scripts/tokens-to-scss.mjs tokens/figma src/styles/tokens

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const [inDir = 'tokens/figma', outDir = 'src/styles/tokens'] = process.argv.slice(2);

const kebab = (s) =>
  String(s)
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_/.]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();

const hex2 = (n) => n.toString(16).padStart(2, '0');

// Percorre o JSON e devolve [{ path: ['Brand', '100'], token: {...} }]
function collect(node, path = [], out = []) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue; // $extensions, $schema, etc.
    if (child && typeof child === 'object') {
      if ('$value' in child) out.push({ path: [...path, key], token: child });
      else collect(child, [...path, key], out);
    }
  }
  return out;
}

function computePrefix(fileName) {
  const base = fileName.replace(/\.json$/i, '').replace(/\.tokens$/i, '');
  const isPrimitive = /primitives?/i.test(base);

  if (isPrimitive) {
    return kebab(base.replace(/primitives?/i, '')) || kebab(base);
  }
  return kebab(base);
}

function sassVarName(prefix, path) {
  const parts = path.map(kebab);
  if (parts[0] !== prefix) parts.unshift(prefix);
  return `$${parts.join('-')}`;
}

// Converte o valor literal em Sass, ou null se não for suportado.
function literalToSass(token, warn) {
  const { $type: type, $value: v } = token;

  switch (type) {
    case 'color': {
      if (v.colorSpace && v.colorSpace !== 'srgb') {
        warn(`espaço de cor "${v.colorSpace}" não suportado`);
        return null;
      }
      const [r, g, b] = v.components.map((c) => Math.round(c * 255));
      const a = Number((v.alpha ?? 1).toFixed(4));
      return a === 1 ? `#${hex2(r)}${hex2(g)}${hex2(b)}` : `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    case 'number':
    case 'fontWeight':
    case 'boolean':
      return String(v);
    case 'dimension':
      return typeof v === 'object' ? `${v.value}${v.unit}` : String(v);
    case 'string':
    case 'fontFamily':
      return []
        .concat(v)
        .map((s) => `'${String(s).replace(/'/g, "\\'")}'`)
        .join(', ');
    default:
      warn(`tipo não suportado: ${type}`);
      return null;
  }
}

mkdirSync(outDir, { recursive: true });

const files = readdirSync(inDir).filter((f) => f.toLowerCase().endsWith('.json'));
if (files.length === 0) {
  console.error(`Nenhum .json encontrado em "${inDir}".`);
  process.exit(1);
}

// 1.ª passagem: Carregar todos os ficheiros, mapear tokens locais e construir índice global de variáveis
const fileEntries = [];
const globalVarIdMap = new Map(); // variableId -> { sassVar, partialBase }
const globalCollectionMap = new Map(); // "CollectionName|VariableName" -> { sassVar, partialBase }

for (const file of files) {
  const raw = JSON.parse(readFileSync(join(inDir, file), 'utf8'));
  const base = file.replace(/\.json$/i, '').replace(/\.tokens$/i, '');
  const prefix = computePrefix(file);
  const partialBase = kebab(base);
  const tokens = collect(raw);

  // Mapeamento local deste ficheiro
  const localNames = new Map(
    tokens.map(({ path }) => [path.join('.'), sassVarName(prefix, path)]),
  );

  for (const { path, token } of tokens) {
    const sVar = sassVarName(prefix, path);
    const varId = token.$extensions?.['com.figma.variableId'];
    if (varId) {
      globalVarIdMap.set(varId, { sassVar: sVar, partialBase });
    }

    // Registar pelo nome da coleção do ficheiro
    // Ex: "Color Primitives|White/1000" ou "Typography Primitives|Family Sans"
    const collectionName = raw.$extensions?.['com.figma.collectionName'] || base;
    const nameInCollection = path.join('/');
    globalCollectionMap.set(`${collectionName}|${nameInCollection}`, { sassVar: sVar, partialBase });

    // Variações de normalização para "Color Primitives" vs "Colors Primitives"
    const singularCollection = collectionName.replace(/s\b/gi, '');
    const pluralCollection = singularCollection + 's';
    globalCollectionMap.set(`${singularCollection}|${nameInCollection}`, { sassVar: sVar, partialBase });
    globalCollectionMap.set(`${pluralCollection}|${nameInCollection}`, { sassVar: sVar, partialBase });
  }

  fileEntries.push({ file, base, prefix, partialBase, tokens, localNames });
}

let total = 0;
let skipped = 0;

// 2.ª passagem: Gerar o SCSS de cada ficheiro com resolução de primitivos/aliases
for (const { file, prefix, partialBase, tokens, localNames } of fileEntries) {
  const neededUses = new Set();
  const tokenRows = [];
  let group;

  for (const { path, token } of tokens) {
    const warn = (msg) => console.warn(`[${file}] ${path.join('/')}: ${msg}`);
    let value = null;

    // A) Alias via DTCG padrão dentro do mesmo ficheiro: "{Brand.100}"
    if (typeof token.$value === 'string' && /^\{.+\}$/.test(token.$value)) {
      const aliasKey = token.$value.slice(1, -1);
      const target = localNames.get(aliasKey);
      if (target) {
        value = target;
      } else {
        warn(`alias ${token.$value} não encontrado`);
      }
    }

    // B) Alias via extensão do Figma (aliasData para primitivos ou outros conjuntos)
    const aliasData = token.$extensions?.['com.figma.aliasData'];
    if (!value && aliasData) {
      const { targetVariableId, targetVariableSetName, targetVariableName } = aliasData;

      let resolved = targetVariableId ? globalVarIdMap.get(targetVariableId) : null;
      if (!resolved && targetVariableSetName && targetVariableName) {
        resolved = globalCollectionMap.get(`${targetVariableSetName}|${targetVariableName}`);
      }

      if (resolved) {
        value = resolved.sassVar;
        if (resolved.partialBase !== partialBase) {
          neededUses.add(resolved.partialBase);
        }
      }
    }

    // C) Valor literal (fallback quando não há alias ou o token é um primitivo/utilitário direto)
    if (!value) {
      value = literalToSass(token, warn);
    }

    if (value === null) {
      skipped++;
      continue;
    }

    const varName = localNames.get(path.join('.'));
    const isNewGroup = path.length > 1 && path[0] !== group;
    if (isNewGroup) group = path[0];

    tokenRows.push({
      group: isNewGroup ? path[0] : null,
      varName,
      value,
    });
    total++;
  }

  const lines = [`// Gerado por scripts/tokens-to-scss.mjs a partir de "${file}". Não editar à mão.`, ''];

  if (neededUses.size > 0) {
    for (const dep of Array.from(neededUses).sort()) {
      lines.push(`@use '${dep}' as *;`);
    }
    lines.push('');
  }

  for (const row of tokenRows) {
    if (row.group) {
      if (lines[lines.length - 1] !== '') lines.push('');
      lines.push(`// ${row.group}`);
    }
    lines.push(`${row.varName}: ${row.value} !default;`);
  }

  const outFile = join(outDir, `_${partialBase}.scss`);
  writeFileSync(outFile, lines.join('\n') + '\n');
  console.log(`${file} -> ${outFile}`);
}

console.log(`\n${total} tokens escritos, ${skipped} ignorados.`);
