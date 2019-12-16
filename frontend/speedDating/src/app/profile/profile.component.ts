import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Globals } from '../globals';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	constructor(private http: HttpService) {}

	ngOnInit() {
		this.http.getProfile().subscribe(res => console.log(res));
	}
}
