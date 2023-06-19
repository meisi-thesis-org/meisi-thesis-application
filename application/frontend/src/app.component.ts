import { LitElement, html, type TemplateResult, type CSSResultGroup, css } from 'lit';
import { customElement } from 'lit/decorators.js';

const componentTemplate = html`
  <div class="container">
    <div class="container--inner"></div>
  </div>
`;

const componentStyles = css`
  .container {
    min-height: 100vh;
    width: 100vw;
  }

  .container--inner {
    min-height: inherit;
    width: inherit;
  }
`;

@customElement('app-component')
export class AppComponent extends LitElement {
  static override styles?: CSSResultGroup = componentStyles;

  public override render(): TemplateResult<1> {
    return componentTemplate;
  }
}
