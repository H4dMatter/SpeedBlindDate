import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  userInformation: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.getBeer().subscribe(data => {
      this.userInformation = data;
      console.log(this.userInformation);
    });
  }

  onClickSubmit(data) {
    console.log(data);
  }

}
