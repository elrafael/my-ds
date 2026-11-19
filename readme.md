# My Design System (`my-ds`)

[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?style=flat-square)](https://stenciljs.com)
[![Storybook](https://img.shields.io/badge/-Storybook-FF4785.svg?style=flat-square&logo=storybook&logoColor=white)](https://storybook.js.org/)

A design system component library built with Web Components using [Stencil](https://stenciljs.com/), styled using design tokens, and documented with [Storybook](https://storybook.js.org/).

Because components compile into standard Web Components (Custom Elements), they can be consumed in any frontend framework (React, Angular, Vue, etc.) or directly in vanilla HTML/JavaScript.

---

## 🎨 Design Reference

This design system is based on the **[Simple Design System (Community)](https://www.figma.com/design/T32qgPYEDpixaWfew87mwT/Simple-Design-System--Community-)** created in Figma.

Design tokens include:
- **Color primitives & semantics:** Brand, Neutral, Success, Warning, Danger, and Base with light & dark theme modes.
- **Typography:** Scale and styles configured using the Inter variable font (`@fontsource-variable/inter`).
- **Sizes & Spacing:** Standardized control sizes (`sm`, `md`, `lg`) and layout dimensions.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm`

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/elrafael/my-ds.git
cd my-ds
npm install
```

---

## 💻 Development

### 1. Run Storybook (Recommended)

To develop and test components interactively with hot-reloading:

```bash
npm run storybook:dev
```

This concurrently starts the Stencil compiler in watch mode and launches Storybook at [http://localhost:6006](http://localhost:6006).

You can also run Storybook by itself if Stencil is already running:

```bash
npm run storybook
```

### 2. Run Stencil Dev Server

To run the local Stencil development server with the demo showcase page (`src/index.html`):

```bash
npm start
```

This serves the demo showcase at [http://localhost:3333](http://localhost:3333) with auto-reload.

---

## 🛠 Available Scripts

| Script | Description |
| --- | --- |
| `npm install` | Installs project dependencies. |
| `npm start` | Starts Stencil in dev mode with watch and serves `src/index.html` at `http://localhost:3333`. |
| `npm run storybook:dev` | Runs Stencil watch build and Storybook dev server concurrently on port `6006`. |
| `npm run storybook` | Starts the Storybook dev server on port `6006`. |
| `npm run build` | Compiles components and tokens for production (`dist/` and `loader/`). |
| `npm run build-storybook` | Builds the static Storybook site for production deployment. |
| `npm test` | Runs unit and component tests with Vitest. |
| `npm run test:watch` | Runs tests in watch mode. |
| `npm run generate` | Scaffolds a new Stencil component using the Stencil CLI. |
| `npm run pack:local` | Builds, bumps a patch version, and generates a local `.tgz` package. |

---

## 📁 Project Structure

```
my-ds/
├── .storybook/          # Storybook configuration & preview settings
├── src/
│   ├── components/      # Web Components (e.g., ds-button)
│   │   └── ds-button/
│   │       ├── ds-button.tsx           # Component implementation
│   │       ├── ds-button.scss          # Component styles
│   │       ├── ds-button.stories.ts    # Storybook documentation & stories
│   │       └── ds-button.cmp.test.tsx  # Component tests
│   ├── styles/          # Design tokens (SCSS)
│   │   ├── mixins/      # Reusable mixins (e.g., control sizes)
│   │   ├── tokens/      # Color primitives, typography, sizes, light/dark themes
│   │   └── _tokens.scss # Global tokens entrypoint
│   ├── index.html       # Local showcase page used with `npm start`
│   └── components.d.ts  # Auto-generated TypeScript definitions for Stencil
├── stencil.config.ts    # Stencil compiler configuration
└── package.json
```

---

## 📦 Using the Components

### Via CDN / Script Tag (Lazy Loading)

```html
<script type="module" src="https://unpkg.com/my-ds/dist/my-ds/my-ds.esm.js"></script>
<link rel="stylesheet" href="https://unpkg.com/my-ds/dist/my-ds/my-ds.css" />

<ds-button variant="brand" hierarchy="default" size="md">
  Click me
</ds-button>
```

### In a Framework / Bundler

Install the package:

```bash
npm install my-ds
```

Import and register the components:

```typescript
import { defineCustomElements } from 'my-ds/loader';

defineCustomElements();
```

Or import individual components as standalone custom elements:

```typescript
import 'my-ds/components/ds-button.js';
```

Use in JSX / HTML:

```tsx
<ds-button variant="brand" hierarchy="default" size="md">
  Submit
</ds-button>
```

---

## 📄 License

[MIT](LICENSE)
