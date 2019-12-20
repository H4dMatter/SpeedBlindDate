import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Globals } from '../globals';
import { ResponseObject } from './response-object';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile-form',
	templateUrl: './profile-form.component.html',
	styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
	constructor(private flash: FlashMessagesService, private http: HttpService, public globals: Globals, public router: Router) {}

	username: string = this.globals.username;
	firstName: string = null;
	lastName: string = null;
	age: number = null;
	hobbies: [string] = null;
	gender: string = null;
	genderPref: string = null;
	minAge: number = null;
	maxAge: number = null;

	images: [{ data: 'Buffer'; contentType: string }] = null;

	submit(data) {
	  console.log(this.username);
		data.username = this.globals.username;
		this.globals.isNewUser ? this.addNewProfile(data) : this.changeProfile(data);
	}

	addNewProfile(data) {
		console.log(data);
		this.http.addProfile(data).subscribe(
			data => {
			  console.log(data);
			  this.flash.show('Profile successfully added', {cssClass: 'alert-secondary'});
      },
			err => {
				console.log(err.statusText);
    this.flash.show(err.statusText, {cssClass: 'alert-warning'});
},
() => {
  this.globals.isLoggedIn = true;
  this.globals.isNewUser = false;
  this.router.navigateByUrl('/profile');
}
);
}

	changeProfile(data) {
		this.http.changeProfile(data).subscribe(
			data => {
			  console.log(data);
       console.log('succesfully updated');
       this.flash.show('Profile successfully updated', {cssClass: 'alert-secondary'});
      },
			err => {
				console.log(err.statusText);
        this.flash.show(err.statusText, {cssClass: 'alert-danger'});
			},
			() => {
				console.log('succesfully updated');
			}
		);
	}

	ngOnInit() {
		if (this.username != null && this.globals.isNewUser === false) {
			this.http.getProfile().subscribe((data: ResponseObject) => {
				console.log(data);
				this.firstName = data.firstName;
				this.lastName = data.lastName;
				this.age = data.age;
				this.hobbies = data.hobbies;
				this.gender = data.gender;
				this.genderPref = data.preferences.genderPref;
				this.minAge = data.preferences.ageRange.minAge;
				this.maxAge = data.preferences.ageRange.maxAge;
			});
		}
	}
}
