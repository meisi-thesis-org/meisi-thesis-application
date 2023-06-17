import { Component } from '@angular/core';
import { BrandTypographyComponent } from '../../atoms/typographies/brand-typography/brand-typography.component';
import { DividerComponent } from '../../atoms/divider/divider.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [BrandTypographyComponent, DividerComponent]
})
export class NavbarComponent {}
