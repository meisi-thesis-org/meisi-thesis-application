import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './sub-header-typography.component.css?inline';

@customElement('app-sub-header-typography-component')
export class SubHeaderTypographyComponent extends LitElement {
  @property({ type: String })
  public content: string = '';

  public override render(): TemplateResult {
    return html`<div class="typography">${this.content}</div>`;
  }

  public static override styles = unsafeCSS(styles);
}
