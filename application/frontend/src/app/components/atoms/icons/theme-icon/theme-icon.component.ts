import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input({ required: true }) public theme: ThemeCollection | undefined;
  @Output() public onClick: EventEmitter<void> = new EventEmitter<void>();

  public getStyles(): Record<string, string> {
    return {
      filter: this.theme === ThemeCollection.DARK_THEME ? 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(5deg) brightness(118%) contrast(122%)' : 'none'
    }
  }

  public click(): void {
    this.onClick.emit();
  }
}
