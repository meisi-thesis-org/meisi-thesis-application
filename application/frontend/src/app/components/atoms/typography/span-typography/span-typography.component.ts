import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-span-typography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './span-typography.component.html',
  styleUrls: ['./span-typography.component.scss']
})
export class SpanTypographyComponent {
  @Input({ required: true }) public content: string | undefined = undefined;
}
