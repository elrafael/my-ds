import type { Preview } from '@storybook/web-components-vite';
import { setCustomElements } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import { defineCustomElements } from '../loader';

// Importa fontes e estilos do Design System
import '@fontsource-variable/inter';
import '../dist/my-ds/my-ds.css';

// Registra os Web Components no DOM
defineCustomElements();

// Converte a documentação gerada pelo Stencil para o formato esperado pelo Storybook (tags/experimental)
if (customElements && (customElements as any).components) {
  const transformed = {
    version: 'experimental',
    tags: (customElements as any).components.map((c: any) => ({
      name: c.tag,
      description: c.docs || '',
      properties: (c.props || []).map((p: any) => ({
        name: p.name,
        type: p.type,
        description: p.docs,
        default: p.default,
      })),
      attributes: (c.props || [])
        .filter((p: any) => p.attr)
        .map((p: any) => ({
          name: p.attr,
          type: p.type,
          description: p.docs,
          default: p.default,
        })),
      events: (c.events || []).map((e: any) => ({
        name: e.event,
        description: e.docs,
      })),
      slots: (c.slots || []).map((s: any) => ({
        name: s.name,
        description: s.docs,
      })),
      cssProperties: (c.styles || []).map((s: any) => ({
        name: s.name,
        description: s.docs,
      })),
      cssParts: (c.parts || []).map((p: any) => ({
        name: p.name,
        description: p.docs,
      })),
    })),
  };
  setCustomElements(transformed);
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;