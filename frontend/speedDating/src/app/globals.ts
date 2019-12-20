import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})

export class Globals {
  constructor(private auth: AuthService) {
  }

  username: string = this.getUsernameByToken();
  isLoggedIn: boolean = this.auth.loggedIn();
  isNewUser = false;

  getUsernameByToken() {
    if (this.auth.loggedIn()) {
      const newToken = localStorage.getItem('token');
      const decToken = jwt_decode(newToken);
      return decToken.subject;
    } else {
      return null;
    }
  }
}

