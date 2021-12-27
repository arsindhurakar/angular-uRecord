import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() parentGroup: FormGroup;
  @Input() sharedGroup: FormGroup;
  @Input() isReadOnly: boolean;

  constructor() {}
}
