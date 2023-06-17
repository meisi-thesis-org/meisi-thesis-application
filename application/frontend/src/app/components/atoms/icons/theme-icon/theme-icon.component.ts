import { Component } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import { ThemeCollection } from '../../../../core/services/theme/theme.collection';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-theme-icon',
  templateUrl: './theme-icon.component.html',
  styleUrls: ['./theme-icon.component.scss'],
  imports: [CommonModule]
})
export class ThemeIconComponent {
  public constructor(
    private readonly _themeService: ThemeService
  ) {}

  public get themeService(): ThemeService {
    return this._themeService;
  }

  public getStyles(theme: ThemeCollection): Record<string, string> {
    return {
      filter: theme === ThemeCollection.DARK_THEME ? 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(5deg) brightness(118%) contrast(122%)' : 'none'
    }
  }
}
