import { render, h, describe, it, expect } from '@stencil/vitest';

describe('ds-button', () => {
  it('renders with default props (brand default)', async () => {
    const { root } = await render(<ds-button>Click me</ds-button>);
    const button = root.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.classList.contains('ds-button--brand')).toBe(true);
    expect(button?.classList.contains('ds-button--default')).toBe(true);
    expect(button?.classList.contains('ds-button--md')).toBe(true);
  });

  it('renders custom variant and hierarchy', async () => {
    const { root } = await render(
      <ds-button variant="success" hierarchy="secondary" size="lg">
        Save
      </ds-button>,
    );
    const button = root.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('ds-button--success')).toBe(true);
    expect(button?.classList.contains('ds-button--secondary')).toBe(true);
    expect(button?.classList.contains('ds-button--lg')).toBe(true);
  });

  it('renders disabled state', async () => {
    const { root } = await render(<ds-button disabled>Disabled</ds-button>);
    const button = root.shadowRoot?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
  });
});
