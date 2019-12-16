import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-profile-form',
	templateUrl: './profile-form.component.html',
	styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
	constructor(private http: HttpService) {}

	firstName: String = null;
	lastName: String = null;
	age: Number = null;
	hobbies: [String] = null;
	gender: String = null;
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
