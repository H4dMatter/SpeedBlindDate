import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Globals } from '../globals';

@Component({
	selector: 'app-profile-form',
	templateUrl: './profile-form.component.html',
	styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
	constructor(private http: HttpService, public globals: Globals) {}

	username: string = this.globals.username;
	firstName: string = 'anne';
	lastName: string = null;
	age: number = null;
	hobbies: [string] = null;
	gender: string = null;
	preferences: {
		genderPref: string;
		ageRange: {
			minAge: number;
			maxAge: number;
		};
	} = null;
	images: [{ data: 'Buffer'; contentType: string }] = null;

	onClickSubmit(data) {
		data.username = this.username;
		console.log(data);
		this.http.addProfile(data).subscribe(res => console.log(res));
	}

	ngOnInit() {}
}
