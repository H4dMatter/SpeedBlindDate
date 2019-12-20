import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { HttpService } from '../http.service';



@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(public globals: Globals, private http: HttpService, public router: Router) {
  }

  ngOnInit() {
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.globals.username = null;
    this.globals.isLoggedIn = false;
    this.router.navigate(['']);
  }
}
