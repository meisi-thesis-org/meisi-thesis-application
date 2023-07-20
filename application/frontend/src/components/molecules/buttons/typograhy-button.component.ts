import { type HTMLTemplateResult, LitElement, html, type CSSResultGroup, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-typography-button')
export class TypographyButtonComponent extends LitElement {
  public static override styles?: CSSResultGroup | undefined = css`
    :host {
      box-shadow: 0 0 0.5rem 0.25rem var(--dark--secondary--color);
    }

    .button {
      height: 5rem;
      width: 15rem;

      background-color: inherit;
      color: inherit;

      border: none;

      cursor: pointer;
    }
  `;

  @property({ type: String })
  public content: string = '';

  public override render(): HTMLTemplateResult {
    return html`
      <button class="button">
        <app-span-typography
          content='${this.content}'
        ></app-span-typography>
      </button>
    `;
  }
}
