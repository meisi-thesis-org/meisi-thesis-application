import { LitElement, type HTMLTemplateResult, html, css, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import './pages/landing/landing.component';
import './components/molecules/buttons/typograhy-button.component';
import './components/atoms/typography/header-typography.component';
import './components/atoms/typography/sub-header-typography.component';
import './components/atoms/typography/span-typography.component';

@customElement('app-component')
export class AppComponent extends LitElement {
  public static override styles?: CSSResultGroup | undefined = css`
    .wrapper {
      min-height: 100vh;

      background-color: var(--dark--primary--color);
      color: var(--light--primary--color);
    }

  `;

  public override render(): HTMLTemplateResult {
    return html`
      <div class="wrapper">
        <app-landing></app-landing>
      </div>
    `;
  }
}
