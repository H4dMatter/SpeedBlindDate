import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	constructor(private http: HttpClient) {}

	addProfile(data) {
		console.log(data);
		return this.http.post('http://localhost:5000/profile', data, { responseType: 'text' });
	}

	registrationUser(data) {
	  console.log(data);
    return this.http.post('http://localhost:5000/user', data, { responseType: 'json' });
  }

  showUser() {
    return this.http.get('http://localhost:5000/user/:username',{ responseType: 'json' });
  }

  passportAuthenticate(data) {
    console.log(data);
    return this.http.post('http://localhost:5000/user/login', data, { responseType: 'json' });
  }

  logoutUser() {
    return this.http.get('http://localhost:5000/user/logout', { responseType: 'text' });
  }

  deleteUser() {
    return this.http.delete('http://localhost:5000/user/:username',{ responseType: 'json' });
  }

  updateUser(data) {
    console.log(data);
    return this.http.put('http://localhost:5000/user/:username', data, { responseType: 'json' });
  }

}
