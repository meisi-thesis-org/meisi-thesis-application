import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTypographyComponent } from '../../components/atoms/typography/header-typography/header-typography.component';
import { SubHeaderTypographyComponent } from '../../components/atoms/typography/sub-header-typography/sub-header-typography.component';
import { TypographyButtonComponent } from '../../components/molecules/buttons/typography-button/typography-button.component';
import { DividerComponent } from '../../components/atoms/divider/divider.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  imports: [CommonModule, HeaderTypographyComponent, SubHeaderTypographyComponent, TypographyButtonComponent, DividerComponent]
})
export class LandingComponent {

}
