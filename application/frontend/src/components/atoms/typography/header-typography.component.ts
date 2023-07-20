import { type HTMLTemplateResult, LitElement, html, css, type CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-header-typography')
export class HeaderTypographyComponent extends LitElement {
  @property({ type: String })
  public content: string = '';

  public static override styles?: CSSResultGroup | undefined = css`
    .typography {
      font-size: clamp(1rem, 1rem + 0.5vw, 2rem);
      font-weight: 800;
    }
  `;

  public override render(): HTMLTemplateResult {
    return html`
      <div class="typography">
        ${this.content}
      </div>
    `;
  }
}
