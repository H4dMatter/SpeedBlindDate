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
		genderPref: String;
		ageRange: {
			minAge: Number;
			maxAge: Number;
		};
	} = null;
	images: [{ data: 'Buffer'; contentType: String }] = null;

	onClickSubmit(data) {
		this.http.addProfile(data).subscribe(data => console.log(data));
	}

	ngOnInit() {}
}
