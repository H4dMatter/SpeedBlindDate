import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class Globals {
	username: string = 'test';
	isLoggedIn: boolean = false;
}
