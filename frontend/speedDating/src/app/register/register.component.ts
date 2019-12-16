import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpService) {}

  ngOnInit() {
  }

  onClickSubmit(data) {
    this.http.registrationUser(data).subscribe(res => console.log(res));
  }
}

