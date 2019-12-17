import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	constructor(private http: HttpService, public router: Router, public globals: Globals) {}

	ngOnInit() {}

	onClickSubmit(data) {
		this.http.registrationUser(data).subscribe(
			res => console.log(res),
			err => {
				console.log(err.statusText);
			},
			() => {
				this.globals.username = data.username;
				this.globals.isNewUser = true;

				this.router.navigateByUrl('/profile');
			}
		);
	}
}
