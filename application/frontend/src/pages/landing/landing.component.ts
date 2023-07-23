import { type HTMLTemplateResult, LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './landing.component.css?inline';

@customElement('app-landing')
export class LandingComponent extends LitElement {
  public override render(): HTMLTemplateResult {
    return html`
      <div class="container">
        <div class="container__inner">
          <div class="container__inner__box">
            <app-header-typography-component
              content="E-Bookler"
            ></app-header-typography-component>
            <app-sub-header-typography-component
              content="Our Platform. Your creative content. Monetize your creative time!"
            ></app-sub-header-typography-component>
          </div>
          <div class="container__inner__box"></div>
        </div>
      </div>
    `;
  }

  public static override styles = unsafeCSS(styles);
}
