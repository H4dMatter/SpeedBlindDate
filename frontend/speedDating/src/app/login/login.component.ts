import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	constructor(public _globals: Globals) {}

	ngOnInit() {}

	onClickSubmit(data) {
		this._globals.username = data.email;
		this._globals.isLoggedIn = true;
		console.log(this._globals.isLoggedIn + ' ' + this._globals.username);
	}
}
