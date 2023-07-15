import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpanTypographyComponent } from '../../../atoms/typography/span-typography/span-typography.component';

@Component({
  selector: 'app-typography-button',
  standalone: true,
  templateUrl: './typography-button.component.html',
  styleUrls: ['./typography-button.component.scss'],
  imports: [CommonModule, SpanTypographyComponent]
})
export class TypographyButtonComponent {
  @Input({ required: true }) public content: string | undefined = undefined;
}
