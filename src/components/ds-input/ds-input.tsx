import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

let nextUniqueId = 0;

@Component({
  tag: 'ds-input',
  styleUrl: 'ds-input.scss',
  shadow: true,
})
export class DsInput {
  private inputId = `ds-input-${++nextUniqueId}`;

  /**
   * Label textual exibido acima do campo de entrada.
   */
  @Prop() label?: string;

  /**
   * Texto de placeholder exibido quando o campo está vazio.
   */
  @Prop() placeholder?: string;

  /**
   * Valor atual do campo.
   */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /**
   * Tipo nativo do input HTML.
   */
  @Prop() type: InputType = 'text';

  /**
   * Tamanho do controle: 'sm' | 'md' | 'lg'.
   */
  @Prop() size: InputSize = 'md';

  /**
   * Indica se o campo está desabilitado.
   */
  @Prop() disabled: boolean = false;

  /**
   * Indica se o campo é somente leitura.
   */
  @Prop() readonly: boolean = false;

  /**
   * Indica se o preenchimento do campo é obrigatório.
   */
  @Prop() required: boolean = false;

  /**
   * Nome do campo para envio em formulários.
   */
  @Prop() name?: string;

  /**
   * Texto de ajuda exibido abaixo do campo.
   */
  @Prop() helperText?: string;

  /**
   * Mensagem de erro de validação exibida abaixo do campo.
   * Quando definida, ativa automaticamente o estado de erro/invalid.
   */
  @Prop() errorMessage?: string;

  /**
   * Indica se o campo está em estado de erro visual (inválido).
   */
  @Prop() invalid: boolean = false;

  /**
   * Disparado a cada alteração de caractere digitada pelo usuário.
   */
  @Event() dsInput!: EventEmitter<string>;

  /**
   * Disparado quando o valor é confirmado (commit / blur / enter).
   */
  @Event() dsChange!: EventEmitter<string>;

  /**
   * Disparado quando o input recebe foco.
   */
  @Event() dsFocus!: EventEmitter<FocusEvent>;

  /**
   * Disparado quando o input perde o foco.
   */
  @Event() dsBlur!: EventEmitter<FocusEvent>;

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dsInput.emit(this.value);
  };

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dsChange.emit(this.value);
  };

  private handleFocus = (event: FocusEvent) => {
    this.dsFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.dsBlur.emit(event);
  };

  render() {
    const isInvalid = this.invalid || Boolean(this.errorMessage);
    const isSearch = this.type === 'search';

    const containerClasses = [
      'ds-input-container',
      `ds-input-container--${this.size}`,
      isSearch ? 'ds-input-container--search' : '',
      this.disabled ? 'ds-input-container--disabled' : '',
      isInvalid ? 'ds-input-container--invalid' : '',
    ].filter(Boolean).join(' ');

    const inputClasses = [
      'ds-input__field',
      `ds-input__field--${this.size}`,
      isSearch ? 'ds-input__field--search' : '',
      isInvalid ? 'ds-input__field--invalid' : '',
    ].filter(Boolean).join(' ');

    return (
      <div class={containerClasses}>
        {this.label && (
          <label class="ds-input__label" htmlFor={this.inputId}>
            {this.label}
            {this.required && <span class="ds-input__required-indicator" aria-hidden="true"> *</span>}
          </label>
        )}

        <div class="ds-input__wrapper">
          <input
            id={this.inputId}
            class={inputClasses}
            type={this.type}
            name={this.name}
            placeholder={this.placeholder}
            value={this.value}
            disabled={this.disabled}
            readOnly={this.readonly}
            required={this.required}
            aria-invalid={isInvalid ? 'true' : 'false'}
            aria-describedby={
              this.errorMessage
                ? `${this.inputId}-error`
                : this.helperText
                ? `${this.inputId}-helper`
                : undefined
            }
            onInput={this.handleInput}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {isSearch && (
            <span class="ds-input__search-icon" aria-hidden="true" part="search-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
                <path d="M20 20L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
          )}
        </div>

        {this.errorMessage ? (
          <div id={`${this.inputId}-error`} class="ds-input__message ds-input__message--error" role="alert">
            {this.errorMessage}
          </div>
        ) : this.helperText ? (
          <div id={`${this.inputId}-helper`} class="ds-input__message ds-input__message--helper">
            {this.helperText}
          </div>
        ) : null}
      </div>
    );
  }
}
