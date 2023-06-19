import { LitElement, type TemplateResult, customElement, html } from 'lit-element';

@customElement('app-root')
export class AppComponent extends LitElement {
  public override render(): TemplateResult<1> {
    return html`
      <div class="container">
        <div class="container--inner">
          <app-navbar></app-navbar>
        </div>
      </div>
    `;
  }
}
