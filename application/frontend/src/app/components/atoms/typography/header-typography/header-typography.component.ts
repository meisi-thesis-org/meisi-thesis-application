import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-typography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-typography.component.html',
  styleUrls: ['./header-typography.component.scss']
})
export class HeaderTypographyComponent {
  @Input({ required: true }) public content: string | undefined = undefined;
}
