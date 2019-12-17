import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class Globals {
	username: string = null;
	isLoggedIn: boolean = false;
	isNewUser: boolean = false;
}
