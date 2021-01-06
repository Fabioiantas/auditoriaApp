import { CredentialUser } from './../models/credential-user';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user: CredentialUser = null;
  public userBehavior = new BehaviorSubject(this.user);
  currentUser = this.userBehavior.asObservable();

  constructor() { }

  changeCurrentUser(user: CredentialUser) {
    console.log('changeCurrentUser ' + JSON.stringify(user));
    this.userBehavior.next(user);
  }
}
