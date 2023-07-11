import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type FormComponentModel } from './form.component.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input({ required: true }) public formComponentModel: FormComponentModel | undefined = undefined;
}
