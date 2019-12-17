import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	constructor(public globals: Globals, private http: HttpService) {}

	ngOnInit() {}

	onClickSubmit(data) {
		this.globals.username = data.username;
		this.http.passportAuthenticate(data).subscribe(
			res => console.log(res),
			err => {
				console.log(err.statusText);
			},
			() => {
				this.globals.username = data.username;
				this.globals.isLoggedIn = true;
			}
		);
	}
}
