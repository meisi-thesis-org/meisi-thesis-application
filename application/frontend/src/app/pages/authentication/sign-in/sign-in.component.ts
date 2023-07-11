import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTypographyComponent } from '../../../components/atoms/typography/header-typography/header-typography.component';
import { SubHeaderTypographyComponent } from '../../../components/atoms/typography/sub-header-typography/sub-header-typography.component';
import { type FormComponentModel } from 'src/app/components/organisms/form/form.component.model';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [CommonModule, HeaderTypographyComponent, SubHeaderTypographyComponent]
})
export class SignInComponent {
  private readonly formComponentModel: FormComponentModel;

  public constructor() {
    this.formComponentModel = { formActionCollection: [], formCategoryCollection: [] }
    this.defineFormCategoryCollection();
    this.defineFormActionCollection();
  }

  private defineFormCategoryCollection(): void {
    this.formComponentModel.formCategoryCollection.push(
      { name: 'Account Information', formCategoryFieldCollection: [{ name: 'accessCode', type: 'string', placeholder: 'Bookler Key', rules: ['required'] }] }
    )
  }

  private defineFormActionCollection(): void {
    this.formComponentModel.formActionCollection.push(
      { placeholder: 'SignIn Account', segment: 'button', callback: this.onSignInAction, redirectionRoute: '/dashboard' },
      { placeholder: 'Don’t have an account? Register here!', segment: 'link', redirectionRoute: '/sign-up' },
      { placeholder: 'Forgot your account data? Recover here!', segment: 'link', redirectionRoute: '/recover-access-code' }
    )
  }

  private onSignInAction(): void {}
}
