import { render, h, describe, it, expect } from '@stencil/vitest';

describe('ds-input', () => {
  it('renders with default props', async () => {
    const { root } = await render(<ds-input placeholder="Value" />);
    const input = root.shadowRoot?.querySelector('input');
    expect(input).not.toBeNull();
    expect(input?.getAttribute('placeholder')).toBe('Value');
    expect(input?.classList.contains('ds-input__field--md')).toBe(true);
  });

  it('renders label and connects it with the input id', async () => {
    const { root } = await render(<ds-input label="Full Name" placeholder="Value" />);
    const label = root.shadowRoot?.querySelector('label');
    const input = root.shadowRoot?.querySelector('input');

    expect(label).not.toBeNull();
    expect(label?.textContent).toContain('Full Name');
    expect(label?.getAttribute('for')).toBe(input?.getAttribute('id'));
  });

  it('renders different size variants', async () => {
    const { root: rootSm } = await render(<ds-input size="sm" />);
    const inputSm = rootSm.shadowRoot?.querySelector('input');
    expect(inputSm?.classList.contains('ds-input__field--sm')).toBe(true);

    const { root: rootLg } = await render(<ds-input size="lg" />);
    const inputLg = rootLg.shadowRoot?.querySelector('input');
    expect(inputLg?.classList.contains('ds-input__field--lg')).toBe(true);
  });

  it('handles disabled state', async () => {
    const { root } = await render(<ds-input disabled label="Disabled Input" />);
    const input = root.shadowRoot?.querySelector('input');
    const container = root.shadowRoot?.querySelector('.ds-input-container');

    expect(input?.hasAttribute('disabled')).toBe(true);
    expect(container?.classList.contains('ds-input-container--disabled')).toBe(true);
  });

  it('renders helper text when provided', async () => {
    const { root } = await render(<ds-input helperText="Helpful tip here" />);
    const helper = root.shadowRoot?.querySelector('.ds-input__message--helper');
    expect(helper).not.toBeNull();
    expect(helper?.textContent).toBe('Helpful tip here');
  });

  it('renders error message and marks aria-invalid', async () => {
    const { root } = await render(<ds-input errorMessage="This field is required" />);
    const error = root.shadowRoot?.querySelector('.ds-input__message--error');
    const input = root.shadowRoot?.querySelector('input');

    expect(error).not.toBeNull();
    expect(error?.textContent).toBe('This field is required');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(input?.classList.contains('ds-input__field--invalid')).toBe(true);
  });

  it('updates value and emits dsInput event', async () => {
    let emittedValue = '';
    const { root } = await render(
      <ds-input onDsInput={(e: CustomEvent<string>) => (emittedValue = e.detail)} />
    );

    const input = root.shadowRoot?.querySelector('input');
    if (input) {
      input.value = 'John Doe';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(emittedValue).toBe('John Doe');
  });

  it('emits dsChange event on change', async () => {
    let changedValue = '';
    const { root } = await render(
      <ds-input onDsChange={(e: CustomEvent<string>) => (changedValue = e.detail)} />
    );

    const input = root.shadowRoot?.querySelector('input');
    if (input) {
      input.value = 'Jane Doe';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    expect(changedValue).toBe('Jane Doe');
  });

  it('renders search input with search icon and classes when type is search', async () => {
    const { root } = await render(<ds-input type="search" placeholder="Keywords" />);
    const input = root.shadowRoot?.querySelector('input');
    const container = root.shadowRoot?.querySelector('.ds-input-container');
    const icon = root.shadowRoot?.querySelector('.ds-input__search-icon');
    const svg = icon?.querySelector('svg');

    expect(input?.getAttribute('type')).toBe('search');
    expect(input?.classList.contains('ds-input__field--search')).toBe(true);
    expect(container?.classList.contains('ds-input-container--search')).toBe(true);
    expect(icon).not.toBeNull();
    expect(svg).not.toBeNull();
  });

  it('does not render search icon when type is text', async () => {
    const { root } = await render(<ds-input type="text" placeholder="Value" />);
    const icon = root.shadowRoot?.querySelector('.ds-input__search-icon');

    expect(icon).toBeNull();
  });
});
