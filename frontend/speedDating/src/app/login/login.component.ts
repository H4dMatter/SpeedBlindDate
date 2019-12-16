import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public _globals: Globals, private http: HttpService) { }

  ngOnInit() {
  }

  onClickSubmit(data) {
    this._globals.username = data.email;
    this._globals.isLoggedIn = true;
    this.http.passportAuthenticate(data).subscribe(res => console.log(res));
    //console.log(this._globals.isLoggedIn + " " + this._globals.username);
  }

}
