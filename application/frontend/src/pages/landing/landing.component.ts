import { type HTMLTemplateResult, LitElement, html, type CSSResultGroup, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-landing')
export class LandingComponent extends LitElement {
  public static override styles?: CSSResultGroup | undefined = css`
    .container {
      min-height: 100vh;
    }

    .container__inner {
      min-height: inherit;

      padding: 0 2.5rem;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; 

      gap: 2.5rem;
    }

    .container__inner__typography {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      text-align: center;
      
      gap: 1.5rem;
    }
  `;

  public override render(): HTMLTemplateResult {
    return html`
      <div class="container">
        <div class="container__inner">
          <div class="container__inner__typography">
            <app-header-typography 
              content="Welcome To E-Bookler"
            ></app-header-typography>
            <app-sub-header-typography 
              content="Our Platform. Your creative and original content. Start monetizing your writing time."
            ></app-sub-header-typography> 
          </div>
          <app-typography-button
            content="Getting Started"
          ></app-typography-button>
        </div>
      </div>
    `;
  }
}
