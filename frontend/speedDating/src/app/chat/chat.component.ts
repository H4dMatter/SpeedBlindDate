import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Globals } from '../globals';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/throttleTime';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
	message: string;
	messages: string[] = [];

	constructor(private chatService: ChatService, public globals: Globals) {}

	sendMessage() {
		this.chatService.sendMessage(this.globals.username + ': ' + this.message);
		this.message = '';
	}

	ngOnDestroy() {
		this.chatService.disconnectUser();
	}

	ngOnInit() {
		this.chatService = new ChatService();
		this.chatService.getUserList().subscribe((message: string[]) => {
			console.log(message);
		});
		this.chatService
			.getMessages()
			.distinctUntilChanged()
			.filter((message: string) => message.trim().length > 0)
			.throttleTime(1000)
			.subscribe((message: string) => {
				this.messages.push(message);
			});
		this.chatService.newUser(this.globals.username);
	}
}
