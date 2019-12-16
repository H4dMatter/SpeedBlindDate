import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	navbarOpen = false;

	toggleNavbar() {
		this.navbarOpen = !this.navbarOpen;
	}

	constructor(public _globals: Globals, private http: HttpService) {}
	ngOnInit() {}

	logoutUser() {
		this._globals.username = null;
		this._globals.isLoggedIn = false;
		console.log(this._globals.isLoggedIn + ' ' + this._globals.username);
		this.http.logoutUser().subscribe(res => console.log(res));
	}
}
