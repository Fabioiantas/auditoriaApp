import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { CredentialUser } from '../models/credential-user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<CredentialUser>;
  public currentUser: Observable<CredentialUser>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<CredentialUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.router = router;
  }

  public get currentUserValue(): CredentialUser {
    return this.currentUserSubject.value;
  }

  login(credentials) {
    return this.http.post<any>(environment.baseUrl + '/login', { email: credentials.email, password: credentials.password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.setCurrentUser();
          // this.currentUserSubject.next(user);
          // console.log('atuh ' + JSON.stringify(user));
        }
        return user;
      }));
  }

   getCurrentUser() {
     return this.http.get<any>(environment.baseUrl + '/user');
   }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  recover(email) {
    return this.http.post<any>(environment.baseUrl + '/recover', email);
  }

  sendResetPasswordLink(data) {
    return this.http.post(environment.baseUrl + '/reset-password-request', data);
  }

  resetPassword(data) {
    return this.http.post(environment.baseUrl + '/change-password', data);
  }

  setCurrentUser() {
    this.currentUserSubject = new BehaviorSubject<CredentialUser>(JSON.parse(localStorage.getItem('currentUser')));
  }

}
