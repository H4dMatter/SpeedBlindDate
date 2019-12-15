import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-profile-form',
	templateUrl: './profile-form.component.html',
	styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
	constructor(private http: HttpService) {}

	onClickSubmit(data) {
		this.http.addProfile(data).subscribe();
	}

	ngOnInit() {}
}
