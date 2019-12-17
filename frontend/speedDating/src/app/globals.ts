import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class Globals {
	username: string = 'MaxF';
	isLoggedIn: boolean = false;
}
