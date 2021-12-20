import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class SharedFormComponent implements OnInit {
  @Input() parentGroup: FormGroup;
  @Input() sharedGroup: FormGroup;
  @Input() isReadOnly: boolean;

  get name() {
    return this.sharedGroup.get('name');
  }

  get contactNo() {
    return this.sharedGroup.get('contactNo');
  }

  get email() {
    return this.sharedGroup.get('email');
  }

  get address() {
    return this.sharedGroup.get('address') as FormArray;
  }

  get street() {
    return this.sharedGroup.get('address')['controls']['street'];
  }

  get city() {
    return this.sharedGroup.get('address')['controls']['city'];
  }

  constructor() {}

  ngOnInit(): void {}
}
