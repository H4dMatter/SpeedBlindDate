import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from './globals';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	constructor(private http: HttpClient, public globals: Globals) {}

	addProfile(data) {
		console.log(data);
		return this.http.post('http://localhost:5000/profile', data, { responseType: 'text' });
	}

	getProfile() {
		console.log('http://localhost:5000/profile/' + this.globals.username);
		return this.http.get('http://localhost:5000/profile/' + this.globals.username);
	}

	changeProfile(data) {
		return this.http.put('http://localhost:5000/profile/' + this.globals.username, data, {
			responseType: 'text'
		});
	}

	addMessages() {
		console.log('hey there, msg save');
	}

	showUser() {
		return this.http.get('http://localhost:5000/user/' + this.globals.username, {
			responseType: 'json'
		});
	}

	registrationUser(data) {
		console.log(data);
		return this.http.post('http://localhost:5000/user', data, { responseType: 'json' });
	}

	deleteUser() {
		return this.http.delete('http://localhost:5000/user/' + this.globals.username, {
			responseType: 'json'
		});
	}

	updateUser(data) {
		console.log(data);
		return this.http.put('http://localhost:5000/user/' + this.globals.username, data, {
			responseType: 'json'
		});
	}

	logoutUser() {
		return this.http.get('http://localhost:5000/user/logout', { responseType: 'text' });
	}
}
