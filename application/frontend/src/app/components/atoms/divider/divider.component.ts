import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../core/services/theme/theme.service';

@Component({
  standalone: true,
  selector: 'app-divider',
  templateUrl: 'divider.component.html',
  styleUrls: ['divider.component.scss']
})
export class DividerComponent {
  @Input() public width: string = '0.025rem';
  @Input() public height: string = '2rem';
  @Input() public backgroundColor: string = 'inherit';

  public constructor(
    private readonly _themeService: ThemeService
  ) {}

  public getStyles(): Record<string, string> {
    return {
      width: this.width,
      height: this.height,
      'background-color': this._themeService.isDarkTheme() ? 'var(--light--primary)' : 'var(--dark--primary)'
    }
  }
}
