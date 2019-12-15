import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	constructor(private http: HttpClient) {}

	addProfile(data) {
		console.log('REQUEST!');
		console.log(data);

		return this.http.post('http://localhost:3000/profile', data);
	}

	getBeer() {
		return this.http.get('https://api.openbrewerydb.org/breweries');
	  }

}
