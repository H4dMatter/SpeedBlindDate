import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  userLogin(data) {
    return this.http.post('http://localhost:5000/user/login', data);
  }

  registrationUser(data) {
    console.log(data);
    return this.http.post('http://localhost:5000/user', data);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
