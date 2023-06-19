/* eslint-disable @typescript-eslint/no-var-requires */
import { LitElement, html, type TemplateResult, css, unsafeCSS, type CSSResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-root')
export class AppComponent extends LitElement {
  static override get styles(): CSSResult {
    return css`${unsafeCSS([styles])}`;
  }

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

const styles = `
  .container {
    min-height: 100vh;
    width: 100vw;

    &--inner {
      min-height: inherit;
      width: inherit;
    }
  }
`
