import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrandTypographyComponent } from '../../atoms/typographies/brand-typography/brand-typography.component';
import { DividerComponent } from '../../atoms/divider/divider.component';
import { ThemeIconComponent } from '../../atoms/icons/theme-icon/theme-icon.component';
import { type ThemeCollection } from '../../../core/services/theme/theme.collection';
import { CommonModule } from '@angular/common';
import { MenuIconComponent } from '../../atoms/icons/menu-icon/menu-icon.component';
import { SearchIconComponent } from '../../atoms/icons/search-icon/search-icon.component';
import { SettingsIconComponent } from '../../atoms/icons/settings-icon/settings-icon.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [BrandTypographyComponent, DividerComponent, ThemeIconComponent, CommonModule, MenuIconComponent, SearchIconComponent, SettingsIconComponent]
})
export class NavbarComponent {
  @Input({ required: true }) public theme: ThemeCollection | undefined;
  @Output() public onThemeIconClick: EventEmitter<void> = new EventEmitter<void>();

  public themeIconClick(): void {
    this.onThemeIconClick.emit();
  }
}
