import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class Globals {
  constructor(private auth: AuthService) {
  }
	username: string = null;
	isLoggedIn: boolean = this.auth.loggedIn();
	isNewUser: boolean = false;
}
