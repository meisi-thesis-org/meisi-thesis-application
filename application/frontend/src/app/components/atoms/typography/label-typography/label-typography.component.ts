import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label-typography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-typography.component.html',
  styleUrls: ['./label-typography.component.scss']
})
export class LabelTypographyComponent {
  @Input({ required: true }) public content: string | undefined = undefined;
}