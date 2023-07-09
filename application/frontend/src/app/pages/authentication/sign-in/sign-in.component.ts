import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTypographyComponent } from '../../../components/atoms/typography/header-typography/header-typography.component';
import { SubHeaderTypographyComponent } from '../../../components/atoms/typography/sub-header-typography/sub-header-typography.component';
import { FormComponent } from '../../../components/organisms/form/form.component';
import { type FormField } from 'src/app/components/organisms/form/types/form-field.type';
import { type FormAction } from 'src/app/components/organisms/form/types/form-action.type';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [CommonModule, HeaderTypographyComponent, SubHeaderTypographyComponent, FormComponent]
})
export class SignInComponent {
  private readonly formFields: FormField[] = new Array<FormField>();
  private readonly formActions: FormAction[] = new Array<FormAction>();

  public constructor() {
    this.formFields.push({ name: 'accessCode', type: 'string', placeholder: 'AccessCode', rules: ['required'] });
    this.formActions.push({ type: 'button', placeholder: 'SignIn Account', callback: this.onSignInAction });
  }

  public getFormFields(): FormField[] {
    return this.formFields;
  }

  public getFormActions(): FormAction[] {
    return this.formActions;
  }

  public onSignInAction(): void {}
}
