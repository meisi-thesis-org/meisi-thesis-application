import { LitElement, html, unsafeCSS, type HTMLTemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import styles from './app.component.css?inline';

@customElement('app-component')
export class AppComponent extends LitElement {
  public override render(): HTMLTemplateResult {
    return html`
      <div class="wrapper">
        <app-landing></app-landing>
      </div>
    `
  }

  public static override styles = unsafeCSS(styles);
}
