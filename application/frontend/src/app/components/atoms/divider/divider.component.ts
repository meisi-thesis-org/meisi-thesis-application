import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent {
  @Input() public width: string = '0.050rem';
  @Input() public height: string = '1.5rem';
  @Input() public backgroundColor: string = 'var(--dark--theme--color)';

  public getStyles(): Record<string, string> {
    return {
      width: this.width,
      height: this.height,
      'background-color': 'var(--dark--blue--theme--color)'
    }
  }
}
