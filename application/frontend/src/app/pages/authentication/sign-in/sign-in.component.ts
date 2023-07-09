import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTypographyComponent } from '../../../components/atoms/typography/header-typography/header-typography.component';
import { SubHeaderTypographyComponent } from '../../../components/atoms/typography/sub-header-typography/sub-header-typography.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [CommonModule, HeaderTypographyComponent, SubHeaderTypographyComponent]
})
export class SignInComponent {

}
