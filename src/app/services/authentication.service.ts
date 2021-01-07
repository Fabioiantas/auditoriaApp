import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CredentialUser } from '../models/credential-user';
import { Md5 } from 'ts-md5';
import { Storage } from '@ionic/storage';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<CredentialUser>;
  public currentUser: Observable<CredentialUser>;

  constructor(private http: HttpClient, private loginService: LoginService, private storage: Storage) {
    this.storage.get('currentUser').then((user) => {
      this.currentUserSubject = new BehaviorSubject<CredentialUser>(JSON.parse(user));
      this.loginService.changeCurrentUser(user);
    });
    // this.currentUserSubject = new BehaviorSubject<CredentialUser>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): CredentialUser {
    return this.currentUserSubject.value;
  }

  login(credentials: CredentialUser) {
    const md5 = new Md5();
    
    return this.http.post<any>(environment.baseUrl + '/login',
      { email: credentials.email, password: credentials.password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.storage.set('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.loginService.changeCurrentUser(user);
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.storage.remove('currentUser');
    this.currentUserSubject.next(null);
  }
}
