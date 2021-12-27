import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customInputValidator } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class SharedFormService {
  emailRegex: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private _formBuilder: FormBuilder) {}

  sharedForm(): FormGroup {
    const formGroup = this._formBuilder.group({
      _id: [null],
      name: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z]{2,}$/),
          customInputValidator(/\badmin\b/), //particular string
        ],
      ],
      contactNo: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      address: this._formBuilder.group({
        street: [null, [Validators.required, Validators.minLength(3)]],
        city: [null, [Validators.required, Validators.minLength(3)]],
      }),
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      isSubscribed: [],
    });
    return formGroup;
  }
}
