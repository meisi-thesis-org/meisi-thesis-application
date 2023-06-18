import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/organisms/navbar/navbar.component';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, NavbarComponent]
})
export class AppComponent {
  public constructor(
    private readonly _themeService: ThemeService
  ) {}

  public get themeService(): ThemeService {
    return this._themeService;
  }

  public updateTheme(): void {
    this._themeService.updateState();
  }
}
