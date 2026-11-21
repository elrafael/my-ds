# ds-input



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                             | Type                                                                        | Default     |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- |
| `disabled`     | `disabled`      | Indica se o campo está desabilitado.                                                                                    | `boolean`                                                                   | `false`     |
| `errorMessage` | `error-message` | Mensagem de erro de validação exibida abaixo do campo. Quando definida, ativa automaticamente o estado de erro/invalid. | `string`                                                                    | `undefined` |
| `helperText`   | `helper-text`   | Texto de ajuda exibido abaixo do campo.                                                                                 | `string`                                                                    | `undefined` |
| `invalid`      | `invalid`       | Indica se o campo está em estado de erro visual (inválido).                                                             | `boolean`                                                                   | `false`     |
| `label`        | `label`         | Label textual exibido acima do campo de entrada.                                                                        | `string`                                                                    | `undefined` |
| `name`         | `name`          | Nome do campo para envio em formulários.                                                                                | `string`                                                                    | `undefined` |
| `placeholder`  | `placeholder`   | Texto de placeholder exibido quando o campo está vazio.                                                                 | `string`                                                                    | `undefined` |
| `readonly`     | `readonly`      | Indica se o campo é somente leitura.                                                                                    | `boolean`                                                                   | `false`     |
| `required`     | `required`      | Indica se o preenchimento do campo é obrigatório.                                                                       | `boolean`                                                                   | `false`     |
| `size`         | `size`          | Tamanho do controle: 'sm' \| 'md' \| 'lg'.                                                                              | `"lg" \| "md" \| "sm"`                                                      | `'md'`      |
| `type`         | `type`          | Tipo nativo do input HTML.                                                                                              | `"email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "url"` | `'text'`    |
| `value`        | `value`         | Valor atual do campo.                                                                                                   | `string`                                                                    | `''`        |


## Events

| Event      | Description                                                    | Type                      |
| ---------- | -------------------------------------------------------------- | ------------------------- |
| `dsBlur`   | Disparado quando o input perde o foco.                         | `CustomEvent<FocusEvent>` |
| `dsChange` | Disparado quando o valor é confirmado (commit / blur / enter). | `CustomEvent<string>`     |
| `dsFocus`  | Disparado quando o input recebe foco.                          | `CustomEvent<FocusEvent>` |
| `dsInput`  | Disparado a cada alteração de caractere digitada pelo usuário. | `CustomEvent<string>`     |


## Shadow Parts

| Part            | Description |
| --------------- | ----------- |
| `"search-icon"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
