import { type HTMLTemplateResult, LitElement, html, css, type CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-span-typography')
export class SpanTypographyComponent extends LitElement {
  @property({ type: String })
  public content: string = '';

  public static override styles?: CSSResultGroup | undefined = css`
    .typography {
      font-size: clamp(0.70rem, 0.70rem + 0.5vw, 1.70rem);
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
