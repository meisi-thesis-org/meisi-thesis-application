import { LitElement, html, type TemplateResult, type CSSResultGroup, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-component')
export class AppComponent extends LitElement {
  static override styles?: CSSResultGroup = css`
    @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

    .container {
      min-height: 100vh;
      width: 100vw;

      font-family: 'Quicksand', sans-serif;
    }

    .container--inner {
      min-height: inherit;
      width: inherit;
    }

    .dark-theme {
      background-color: #343540;
      color: #fafafa;
    }

    .light-theme {
      background-color: #fafafa;
      color: #343540;
    }
  `;

  public override render(): TemplateResult<1> {
    return html`
      <div class="container light-theme">
        <div class="container--inner">
          <app-navbar></app-navbar>
        </div>
      </div>
    `;
  }
}
