import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordValidator, customInputValidator } from '../../utils';
import { UserService } from '../../services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  serverErrorMessage: string;
  isSuccess: boolean;
  isProcessing: boolean = false;

  emailRegex: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this._formBuilder.group(
      {
        fullName: [
          null,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern(/^[A-Za-z]{2,}$/),
            customInputValidator(/\badmin\b/),
          ],
        ],
        email: [
          null,
          [Validators.required, Validators.pattern(this.emailRegex)],
        ],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required],
      },
      { validator: passwordValidator }
    );
  }

  handleRegistration(): void {
    this.serverErrorMessage = null;
    this.isProcessing = true;

    if (this.registrationForm.invalid) {
      this.serverErrorMessage = 'Invalid details';
      this.isProcessing = false;
    } else {
      this._userService.register(this.registrationForm.value).subscribe(
        (res) => {
          this.isSuccess = true;
          setTimeout(() => (this.isSuccess = false), 3000);
          this.isProcessing = false;
        },
        (err) => {
          if (err.status === 422) {
            this.serverErrorMessage = err.error.join('<br />');
            console.log(err.error);
          }
          this.isProcessing = false;
        }
      );
    }
  }
}
