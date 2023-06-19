import { LitElement, type TemplateResult, customElement, html } from 'lit-element';

@customElement('app-navbar')
export class NavbarComponent extends LitElement {
  public override render(): TemplateResult<1> {
    return html`
      <div class="container">
        <div class="container--inner">
          <app-brand-typography content="E-Bookler"></app-brand-typography>
        </div>
      </div>
    `;
  }
}
