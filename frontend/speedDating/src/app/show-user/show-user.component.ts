import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {Globals} from '../globals';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  email: string = null;
  username: string = this.globals.username;

  constructor(private http: HttpService, public globals: Globals) {
  }

  ngOnInit() {
   /* this.http.showUser().subscribe(res => {
      this.email = res.email;
      this.username = res.username;
      console.log(this.email + " " + this.username);
    });*/
  }

  onClickSubmitInfo(data) {
    this.globals.username = data.username;
    this.globals.isLoggedIn = true;
    this.http.updateUser(data).subscribe(res => console.log(res));
  }
}

