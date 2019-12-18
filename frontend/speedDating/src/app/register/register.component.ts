import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  token;
	constructor(private flash: FlashMessagesService, private auth: AuthService, public router: Router, public globals: Globals) {}

	ngOnInit() {}

	onClickSubmit(data) {
    this.auth.registrationUser(data).subscribe(
      (res: any) => {
        console.log(res);

        this.token = res.token;
        this.globals.username = data.username;

        localStorage.setItem('token', this.token);

        this.globals.isLoggedIn = this.auth.loggedIn();
        this.router.navigate(['/profile']);
        this.flash.show('Successfully registered', {cssClass: 'alert-secondary'});
      },
      err => {
        console.log(err.statusText);
        this.flash.show(err.statusText, {cssClass: 'alert-danger'});
        },
      () => {
        this.globals.username = data.username;
        this.globals.isNewUser = true;
      }
    );
  }
}

/*this.auth.registrationUser(data).subscribe(
  res => console.log(res),
  err => {
    console.log(err.statusText);
  },

);
}*/
