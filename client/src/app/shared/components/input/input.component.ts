import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() control: AbstractControl = new FormControl();
  @Input() label: string;
  @Input() type: string;
  @Input() isReadOnly: boolean;
  @Input() isPasswordShow: boolean;
  @Input() mask: string;

  constructor() {}

  togglePasswordVisibility() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
}
