import { type CSSResultGroup, LitElement, css, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-navbar')
export class NavbarComponent extends LitElement {
  static override styles?: CSSResultGroup = css`
    .container {
      min-height: 4rem;
    }

    .container--inner {
      min-height: inherit;

      padding: 0.5rem;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .row {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }
  `;

  protected override render(): TemplateResult<1> {
    return html`
      <div class="container">
        <div class="container--inner">
          <div class="container--inner row">
            <app-hamburger-icon></app-hamburger-icon>
            <app-divider></app-divider>
            <app-brand-typography content="E-Bookler"></app-brand-typography>
          </div>
          <div class="container--inner row">
            <app-hamburger-icon></app-hamburger-icon>
            <app-hamburger-icon></app-hamburger-icon>
            <app-divider></app-divider>
            <app-lightbulb-icon></app-lightbulb-icon>
            <app-hamburger-icon></app-hamburger-icon>
          </div>
        </div>
      </div>
    `;
  }
}
