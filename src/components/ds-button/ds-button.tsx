import { Component, Prop, h } from '@stencil/core';

export type ButtonVariant = 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | 'base';
export type ButtonHierarchy = 'default' | 'secondary' | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ds-button',
  styleUrl: 'ds-button.scss',
  shadow: true,
})
export class DsButton {
  /**
   * Intenção semântica / variante de cor do botão.
   * Suporta as categorias oficiais do design system: brand, neutral, success, warning, danger, base.
   * 'primary' é mantido como alias para 'brand' para retrocompatibilidade.
   */
  @Prop() variant: ButtonVariant | 'primary' = 'brand';

  /**
   * Nível de ênfase visual (hierarquia):
   * - 'default': preenchimento sólido (Default / :Hover na matriz)
   * - 'secondary': preenchimento suave com contorno (Secondary / :Hover na matriz)
   * - 'tertiary': preenchimento sutil / ghost (Tertiary / :Hover na matriz)
   */
  @Prop() hierarchy: ButtonHierarchy = 'default';

  /**
   * Tamanho do botão: 'sm' | 'md' | 'lg'
   */
  @Prop() size: ButtonSize = 'md';

  /**
   * Estado desabilitado. Quando ativo, aplica os tokens Disabled semânticos.
   */
  @Prop() disabled: boolean = false;

  /**
   * Tipo HTML nativo do botão.
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  private get normalizedVariant(): ButtonVariant {
    if (this.variant === 'primary') return 'brand';
    return this.variant;
  }

  render() {
    const variant = this.normalizedVariant;
    const classes = [
      'ds-button',
      `ds-button--${variant}`,
      `ds-button--${this.hierarchy}`,
      `ds-button--${this.size}`,
    ].join(' ');

    return (
      <button
        class={classes}
        disabled={this.disabled}
        type={this.type}
      >
        <slot></slot>
      </button>
    );
  }
}

