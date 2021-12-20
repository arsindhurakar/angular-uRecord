import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isProcessing: boolean = false;

  emailRegex: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  serverErrorMessage: string;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, Validators.required],
    });
  }

  handleLogin(): void {
    this.serverErrorMessage = null;
    this.isProcessing = true;
    this._userService.login(this.loginForm.value).subscribe(
      (res) => {
        this._userService.setToken(res['token']);
        this._router.navigateByUrl('/dashboard');
        this.isProcessing = false;
      },
      (err) => {
        this.serverErrorMessage = err.error.message;
        this.isProcessing = false;
      }
    );
  }
}
