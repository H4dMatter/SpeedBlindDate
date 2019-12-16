import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

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

	constructor(public globals: Globals) {}

	ngOnInit() {}
}
