import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

interface DsButtonArgs {
  label: string;
  variant: 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | 'base' | 'primary';
  hierarchy: 'default' | 'secondary' | 'tertiary';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  type: 'button' | 'submit' | 'reset';
}

const meta: Meta<DsButtonArgs> = {
  title: 'Components/ds-button',
  component: 'ds-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['brand', 'neutral', 'success', 'warning', 'danger', 'base'],
      description: 'Intenção semântica / variante de cor do botão.',
    },
    hierarchy: {
      control: 'select',
      options: ['default', 'secondary', 'tertiary'],
      description: 'Nível de ênfase visual (hierarquia).',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão.',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado.',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo HTML nativo do botão.',
    },
  },
  args: {
    label: 'Button',
    variant: 'brand',
    hierarchy: 'default',
    size: 'md',
    disabled: false,
    type: 'button',
  },
  render: (args) => html`
    <ds-button
      variant=${ifDefined(args.variant)}
      hierarchy=${ifDefined(args.hierarchy)}
      size=${ifDefined(args.size)}
      ?disabled=${args.disabled}
      type=${ifDefined(args.type)}
    >
      ${args.label}
    </ds-button>
  `,
};

export default meta;
type Story = StoryObj<DsButtonArgs>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    hierarchy: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    hierarchy: 'tertiary',
  },
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <ds-button variant="brand">Brand</ds-button>
      <ds-button variant="neutral">Neutral</ds-button>
      <ds-button variant="success">Success</ds-button>
      <ds-button variant="warning">Warning</ds-button>
      <ds-button variant="danger">Danger</ds-button>
      <ds-button variant="base">Base</ds-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <ds-button size="sm">Small</ds-button>
      <ds-button size="md">Medium</ds-button>
      <ds-button size="lg">Large</ds-button>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
  },
};
