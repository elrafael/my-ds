import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

interface DsInputArgs {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
}

const meta: Meta<DsInputArgs> = {
  title: 'Components/ds-input',
  component: 'ds-input',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto do label exibido acima do input.',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder.',
    },
    value: {
      control: 'text',
      description: 'Valor textual do input.',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'Tipo do input HTML.',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do controle.',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado.',
    },
    readonly: {
      control: 'boolean',
      description: 'Estado somente leitura.',
    },
    required: {
      control: 'boolean',
      description: 'Indica campo obrigatório.',
    },
    helperText: {
      control: 'text',
      description: 'Mensagem de auxílio exibida abaixo do campo.',
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro de validação.',
    },
    invalid: {
      control: 'boolean',
      description: 'Estado inválido.',
    },
  },
  args: {
    label: 'Full Name',
    placeholder: 'Value',
    value: '',
    type: 'text',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
  },
  render: (args) => html`
    <div style="max-width: 320px;">
      <ds-input
        label=${ifDefined(args.label)}
        placeholder=${ifDefined(args.placeholder)}
        value=${ifDefined(args.value)}
        type=${ifDefined(args.type)}
        size=${ifDefined(args.size)}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?required=${args.required}
        ?invalid=${args.invalid}
        helper-text=${ifDefined(args.helperText)}
        error-message=${ifDefined(args.errorMessage)}
      ></ds-input>
    </div>
  `,
};

export default meta;
type Story = StoryObj<DsInputArgs>;

/**
 * História padrão reproduzindo o design da matriz do Figma (Full Name com placeholder 'Value').
 */
export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Value',
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    placeholder: 'Value',
  },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
      <ds-input size="sm" label="Small (sm)" placeholder="Value"></ds-input>
      <ds-input size="md" label="Medium (md)" placeholder="Value"></ds-input>
      <ds-input size="lg" label="Large (lg)" placeholder="Value"></ds-input>
    </div>
  `,
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'user@example.com',
    helperText: 'We will send your order confirmation here.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Value',
    value: '',
    errorMessage: 'Full name is required.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Value',
    value: 'John Doe',
    disabled: true,
  },
};

/**
 * Demonstração do card completo 'Shipping information' como na imagem do Figma.
 */
export const ShippingInformationForm: Story = {
  render: () => html`
    <div
      style="
        max-width: 340px;
        padding: 24px;
        border: 1px solid var(--sds-color-border-default-default, #e5e7eb);
        border-radius: 12px;
        background: #fff;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        gap: 16px;
        font-family: var(--sds-typography-body-font-family, sans-serif);
      "
    >
      <div>
        <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #111827;">Shipping information</h2>
        <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">We ship within 2 working days</p>
      </div>

      <ds-input label="Full Name" placeholder="Value"></ds-input>

      <div>
        <label style="display: block; font-size: 16px; color: #111827; margin-bottom: 6px;">Location</label>
        <div style="position: relative;">
          <select
            style="
              width: 100%;
              min-height: 36px;
              padding: 8px 16px;
              font-size: 16px;
              border: 1px solid var(--sds-color-border-default-default, #d1d5db);
              border-radius: 8px;
              background-color: #fff;
              color: #111827;
              outline: none;
              box-sizing: border-box;
            "
          >
            <option>Value</option>
            <option>United States</option>
            <option>Brazil</option>
            <option>Europe</option>
          </select>
        </div>
      </div>

      <div>
        <label style="display: block; font-size: 16px; color: #111827; margin-bottom: 6px;">Delivery note</label>
        <textarea
          placeholder="Value"
          rows="3"
          style="
            width: 100%;
            padding: 8px 16px;
            font-size: 16px;
            border: 1px solid var(--sds-color-border-default-default, #d1d5db);
            border-radius: 8px;
            outline: none;
            box-sizing: border-box;
            resize: vertical;
            font-family: inherit;
          "
        ></textarea>
      </div>

      <div style="display: flex; gap: 8px; align-items: flex-start;">
        <input type="checkbox" id="terms" style="margin-top: 4px; accent-color: #111827;" checked />
        <div>
          <label for="terms" style="font-size: 14px; font-weight: 500; color: #111827; display: block; cursor: pointer;">
            I accept the terms
          </label>
          <a href="#" style="font-size: 14px; color: #6b7280; text-decoration: underline;">Read our T&Cs</a>
        </div>
      </div>

      <ds-button variant="brand" hierarchy="default" size="md" style="width: 100%;">
        Save shipping information
      </ds-button>
    </div>
  `,
};

/**
 * Campo de busca com formato pill e ícone de lupa, conforme o design do Figma.
 */
export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Keywords',
    label: undefined,
  },
};

/**
 * Demonstração do menu de filtros completo com o campo de busca arredondado.
 */
export const FilterMenu: Story = {
  render: () => html`
    <div style="font-family: var(--sds-typography-body-font-family, sans-serif); max-width: 300px;">
      <span style="font-size: 11px; color: #9ca3af; margin-bottom: 8px; display: block;">Filter Menu</span>
      <div
        style="
          border: 1px solid var(--sds-color-border-default-default, #d1d5db);
          border-radius: 16px;
          padding: 20px;
          background: #fff;
          display: flex;
          flex-direction: column;
          gap: 20px;
        "
      >
        <ds-input type="search" placeholder="Keywords"></ds-input>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <label style="display: flex; align-items: center; gap: 10px; font-size: 16px; color: #111827; cursor: pointer;">
            <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: #111827;" />
            <span>Label</span>
          </label>
          <label style="display: flex; align-items: center; gap: 10px; font-size: 16px; color: #111827; cursor: pointer;">
            <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: #111827;" />
            <span>Label</span>
          </label>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 16px; color: #111827; margin-bottom: 12px;">
            <span>Label</span>
            <span style="font-size: 14px;">$0-100</span>
          </div>
          <div style="position: relative; height: 6px; background: #e5e7eb; border-radius: 3px; display: flex; align-items: center;">
            <div style="position: absolute; left: 0; width: 14px; height: 14px; border-radius: 50%; background: #1f2937;"></div>
            <div style="position: absolute; right: 0; width: 14px; height: 14px; border-radius: 50%; background: #1f2937;"></div>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 500; color: #111827;">Color</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <label style="display: flex; align-items: center; gap: 10px; font-size: 16px; color: #111827; cursor: pointer;">
              <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: #111827;" />
              <span>Label</span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; font-size: 16px; color: #111827; cursor: pointer;">
              <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: #111827;" />
              <span>Label</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  `,
};

