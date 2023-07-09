import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-typography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-typography.component.html',
  styleUrls: ['./brand-typography.component.scss']
})
export class BrandTypographyComponent {
  @Input({ required: true }) public content: string | undefined = undefined;
}
