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
		console.log(this.globals.username);
		return this.http.get('http://localhost:5000/profile/' + this.globals.username);
	}
}
