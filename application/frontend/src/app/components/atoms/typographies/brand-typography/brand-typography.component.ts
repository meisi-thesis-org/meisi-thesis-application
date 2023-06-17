import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-brand-typography',
  templateUrl: './brand-typography.component.html',
  styleUrls: ['./brand-typography.component.scss']
})
export class BrandTypographyComponent {
  @Input({ required: true }) public content: string = '';
}
