import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  currentUser: any;

  constructor(private authenticationService: AuthenticationService, private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    this.loginService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
    if (this.currentUser && this.currentUser.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.currentUser.token}`
          }
        });
      }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({
          setHeaders: {
            'content-type': 'application/json'
          }
        });
      }

    request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });

    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            if (error.error.success === false) {
              console.log('Login failed');
            } else {
              console.log('Login ok');
            }
          }
          return throwError(error);
        }));
  }

}
