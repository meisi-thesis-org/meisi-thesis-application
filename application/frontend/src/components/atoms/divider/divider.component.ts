import { LitElement, html, type TemplateResult, type CSSResultGroup, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-divider')
export class DividerComponent extends LitElement {
  static override styles?: CSSResultGroup = css`
    .container {
      width: 0.025rem;
      height: 2rem;
      background-color: #000
    }
  `;

  public override render(): TemplateResult<1> {
    return html`<div class="container"></div>`;
  }
}
