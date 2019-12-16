import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  userInformation: Object;

  constructor(private http: HttpService, public globals: Globals) {
  }

  ngOnInit() {
  }

  onClickSubmitInfo() {
    this.http.showUser().subscribe(res => {
      /*this.userInformation = {
          email: res.email;

        };*/
        console.log(this.globals.username + " " + res);
      }
    );
  }
}

/*onClickSubmitPW(data); {
    console.log(data);
  }
}*/

