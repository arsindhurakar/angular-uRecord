import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _toastr: ToastrService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
        ),
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMessage = `${error.error.message}`;
          } else {
            switch (error.status) {
              case 400:
                errorMessage = 'Bad Request.';
                break;
              case 401:
                errorMessage = 'You need to log in to do this action.';
                break;
              case 403:
                errorMessage =
                  "You don't have permission to access the requested resource.";
                break;
              case 409:
                errorMessage = 'Email already exists';
                break;
              case 404:
                errorMessage = 'The requested resource does not exist.';
                break;
              case 500:
                errorMessage = 'Internal Server Error.';
                break;
              case 503:
                errorMessage = 'The requested service is not available.';
                break;
              case 422:
                errorMessage = 'Validation Error!';
                break;
              default:
                errorMessage = 'Something went wrong!';
            }
          }
          this._toastr.error(`${errorMessage}`);
          return throwError(errorMessage);
        })
      );
    }
  }
}
