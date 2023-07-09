import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-header-typography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-header-typography.component.html',
  styleUrls: ['./sub-header-typography.component.scss']
})
export class SubHeaderTypographyComponent {
  @Input({ required: true }) public content: string | undefined = undefined;
}
