import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as jwt_decode from 'jwt-decode';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token;

  constructor(
    private flash: FlashMessagesService,
    private auth: AuthService,
    private router: Router,
    public globals: Globals
  ) {
  }

  ngOnInit() {
  }

  onClickSubmit(data) {
    this.auth.userLogin(data).subscribe(
      (res: any) => {
        this.token = res.token;
        this.globals.username = data.username;
        this.globals.isLoggedIn = this.auth.loggedIn();
        this.router.navigate(['/profile']);
        localStorage.setItem('token', this.token);
        this.flash.show('Successfully logged in', {cssClass: 'alert-secondary'});
      },
      err => {
        console.log(err.statusText);
        this.flash.show(err.statusText, {cssClass: 'alert-danger'});
      },
      () => {
        this.globals.username = data.username;
        this.globals.isLoggedIn = this.auth.loggedIn();
      }
    );
  }
}
