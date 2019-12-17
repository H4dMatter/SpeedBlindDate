import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { HttpService } from '../http.service';
import { importType } from '@angular/compiler/src/output/output_ast';
import { fromEventPattern } from 'rxjs';

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

	constructor(public globals: Globals, private http: HttpService, public router: Router) {}
	ngOnInit() {}

	logoutUser() {
		this.globals.username = null;
		this.globals.isLoggedIn = false;
		console.log(this.globals.isLoggedIn + ' ' + this.globals.username);
		this.http.logoutUser().subscribe(
			res => console.log(res),
			err => {
				console.log(err.statusText);
			},
			() => {
				this.globals.username = null;
				this.globals.isLoggedIn = false;
				this.router.navigateByUrl('/');
			}
		);
	}

	deleteUser() {
		this.http.deleteUser().subscribe(res => console.log(res));
	}
}
