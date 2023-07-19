import { LitElement, type HTMLTemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-component')
export class AppComponent extends LitElement {
  public override render(): HTMLTemplateResult {
    return html``;
  }
}
