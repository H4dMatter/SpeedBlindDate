import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { HttpService } from '../http.service';
<<<<<<< HEAD
=======
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
>>>>>>> loginusername

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
<<<<<<< HEAD
	constructor(public globals: Globals, private http: HttpService) {}

	ngOnInit() {}

	onClickSubmit(data) {
		this.globals.username = data.username;
		this.http.passportAuthenticate(data).subscribe(
			res => console.log(res),
			err => {
				console.log(err.statusText);
			},
			() => {
				this.globals.username = data.username;
				this.globals.isLoggedIn = true;
			}
		);
	}
}
=======
  token;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onClickSubmit(data) {
    this.auth.userLogin(data).subscribe(
      (res:any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/profile']);
      },
      err => console.log(err)
    );
   }
  }
>>>>>>> loginusername
