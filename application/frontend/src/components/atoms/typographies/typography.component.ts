import { LitElement, type TemplateResult, customElement, html, property } from 'lit-element';

@customElement('app-brand-typography')
export class BrandTypographyComponent extends LitElement {
  @property({ type: String })
  public content: string = '';

  public override render(): TemplateResult<1> {
    return html`<span>${this.content}</span></span>`;
  }
}
