import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('noauth')) {
      return next.handle(req.clone());
    } else {
      const clonedReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this._userService.getToken()
        ),
      });
      return next.handle(clonedReq).pipe(
        tap(
          (event) => {},
          (err) => {
            if (err.error.auth == false) {
              this._router.navigateByUrl('/login');
            }
          }
        )
      );
    }
  }
}
