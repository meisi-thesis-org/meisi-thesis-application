import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './header-typography.component.css?inline';

@customElement('app-header-typography-component')
export class HeaderTypographyComponent extends LitElement {
  @property({ type: String })
  public content: string = '';

  public override render(): TemplateResult {
    return html`<div class="typography">${this.content}</div>`;
  }

  public static override styles = unsafeCSS(styles);
}
