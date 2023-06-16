import { Component } from '@angular/core';
import { BrandTypographyComponent } from '../../atoms/typographies/brand/brand-typography.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [BrandTypographyComponent]
})
export class NavbarComponent {}
