import { LitElement, type TemplateResult, html, type CSSResultGroup, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-notification-icon')
export class NotificationIconComponent extends LitElement {
  static override styles?: CSSResultGroup = css`
    img {
      width: 1.25rem;
      height: 1.25rem;

      cursor: pointer;
    }
  `;

  public override render(): TemplateResult<1> {
    return html`<img src="./../../../../assets/notification-icon.svg" />`;
  }
}
