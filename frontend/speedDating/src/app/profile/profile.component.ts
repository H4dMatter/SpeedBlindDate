import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	@Input() otherPersonsProfile;
	// 	firstName: null,
	// 	lastName: null,
	// 	age: null,
	// 	hobbies: null,
	// 	gender: null,
	// 	genderPref: null,
	// 	minAge: null,
	// 	maxAge: null
	// };
	constructor() {}

	ngOnInit() {}
}
