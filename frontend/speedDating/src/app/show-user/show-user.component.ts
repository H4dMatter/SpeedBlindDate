import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import { Globals } from '../globals';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})

export class ShowUserComponent implements OnInit {

  email: string = null;
  username: string = this.globals.username;

  constructor(private router: Router, private flash: FlashMessagesService, private http: HttpService, public globals: Globals) {
  }

  ngOnInit() {
    this.http.showUser().subscribe((res: any) => {
      this.email = res.email;
      this.username = res.username;
      console.log(this.email + ' ' + this.username);
    });
  }

  onClickSubmitInfo(data) {

    console.log(this.globals.username);

    this.globals.isLoggedIn = true;

    this.http.updateUser(data).subscribe(
      res => console.log(res),
      error => {
        console.log(error.statusText);
        this.flash.show(error.statusText, {cssClass: 'alert-danger'});

      },
      () => {
        this.globals.username = data.username;
        console.log(this.globals.username);
        this.flash.show('Successfully updated login-information', {cssClass: 'alert-secondary'});

      }
    );
  }

  deleteUser() {
    this.http.deleteUser().subscribe(
      res => {
        this.router.navigate(['']);
        this.flash.show('We successfully deleted your account', {cssClass: 'alert-danger'});
      },
        err => {
        console.log(err);
        this.router.navigate(['/profile']);
        this.flash.show(err.statusText, {cssClass: 'alert-danger'});
    },
    () => {
        localStorage.removeItem('token');
        this.globals.username = null;
        this.globals.isLoggedIn = false;
    }
  );
  }
}
