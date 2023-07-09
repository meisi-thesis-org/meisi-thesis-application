import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandTypographyComponent } from '../../atoms/typography/brand-typography/brand-typography.component';
import { HamburgerIconComponent } from '../../atoms/icons/hamburger-icon/hamburger-icon.component';
import { DividerComponent } from '../../atoms/divider/divider.component';
import { SettingIconComponent } from '../../atoms/icons/setting-icon/setting-icon.component';
import { SearchIconComponent } from '../../atoms/icons/search-icon/search-icon.component';
import { LocaleIconComponent } from '../../atoms/icons/locale-icon/locale-icon.component';
import { MoonIconComponent } from '../../atoms/icons/moon-icon/moon-icon.component';
import { SunIconComponent } from '../../atoms/icons/sun-icon/sun-icon.component';
import { NotificationIconComponent } from '../../atoms/icons/notification-icon/notification-icon.component';
import { ThemeService } from 'src/app/core/services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    CommonModule,
    BrandTypographyComponent,
    HamburgerIconComponent,
    DividerComponent,
    SettingIconComponent,
    SearchIconComponent,
    LocaleIconComponent,
    MoonIconComponent,
    SunIconComponent,
    NotificationIconComponent
  ]
})
export class NavbarComponent {
  public constructor(
    public readonly themeService: ThemeService
  ) {}
}
