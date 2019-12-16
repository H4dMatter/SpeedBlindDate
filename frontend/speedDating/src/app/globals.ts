import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class Globals {
	username: string = 'max';
	isLoggedIn: boolean = false;
}
