import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
// import { ConsoleReporter } from 'jasmine';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  sessao = true;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401].indexOf(err.status) !== -1) {
       alert('Usuário ou senha inválidos.');
        this.authenticationService.logout();
        location.reload(true);
        return throwError(err.error.message);
      }
      if ([500].indexOf(err.status) !== -1) {
       alert(err.error.message);
        return throwError(err.message);
      }
      if ([512].indexOf(err.status) !== -1) {
       alert(err.error.message);
        return throwError(err.message);
      }
      if ([513].indexOf(err.status) !== -1) { // SESSAO EXPIRADA
        this.sessao = false;
        this.router.navigate(['/login'], { queryParams: { message: err.error.message } });
        //alert(err.error.message);
        return throwError(err.message);
      }
      if ('0'.indexOf(err.status) !== -1) {
        return throwError(JSON.stringify(err));
      }
      const error = err.error || err.statusText;
      return throwError(error);
    }));
  }
}
