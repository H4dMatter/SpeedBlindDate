import { Component } from '@angular/core';
import { Globals } from './globals';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'speedDating';

	// no private and no public, so we need to make an assignment explicitly
	// to provide an access on the template layer
	constructor(public globals: Globals) {}

	onClickSubmit(data) {
		console.log(data);
	}
}
