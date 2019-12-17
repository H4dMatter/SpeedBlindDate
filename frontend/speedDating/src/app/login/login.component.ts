import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	token;
	constructor(private auth: AuthService, private router: Router, public globals: Globals) {}

	ngOnInit() {}

	onClickSubmit(data) {
		this.auth.userLogin(data).subscribe(
			(res: any) => {
				this.token = res.token;
				//TODO delete if token works
				this.globals.isLoggedIn = true;
				this.globals.username = data.username;
				///
				localStorage.setItem('token', this.token);
			},
			err => console.log(err)
		);
	}
}
