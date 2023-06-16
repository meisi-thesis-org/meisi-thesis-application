import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-divider',
  templateUrl: 'divider.component.html',
  styleUrls: ['divider.component.scss']
})
export class DividerComponent {
  @Input() public width: string = '0.25rem';
  @Input() public height: string = '2rem';

  public get styles(): Record<string, string> {
    return {
      width: this.width,
      height: this.height
    }
  }
}
