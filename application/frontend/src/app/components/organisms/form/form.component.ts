import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type FormAction } from './types/form-action.type';
import { type FormField } from './types/form-field.type';
import { DividerComponent } from '../../atoms/divider/divider.component';

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [CommonModule, DividerComponent]
})
export class FormComponent {
  @Input({ required: true }) public formFields: FormField[] = [];
  @Input({ required: true }) public formActions: FormAction[] = [];
}
