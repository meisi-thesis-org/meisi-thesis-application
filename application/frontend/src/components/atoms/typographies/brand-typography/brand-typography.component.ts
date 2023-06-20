import { type CSSResultGroup, LitElement, type TemplateResult, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-brand-typography')
export class NavbarComponent extends LitElement {
  static override styles?: CSSResultGroup = css`
    .container {
      font-size: clamp(1rem, 1rem + 0.5vw, 2rem);
      font-weight: 600;
      font-style: normal;
    }
  `;

  @property({ type: String })
  public content: string = '';

  protected override render(): TemplateResult<1> {
    return html`
      <span class="container">${this.content}</span>
    `;
  }
}
