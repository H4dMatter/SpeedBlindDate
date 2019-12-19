import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Globals } from '../globals';
import { HttpService } from '../http.service';

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
	connectedUsers: string[] = [];

	privateMessage: string[] = [];
	privateChatwithUser: string[] = [];
	privateRoomIds: number[] = [];
	privateMessages = [[]];

	constructor(
		private chatService: ChatService,
		public globals: Globals,
		public http: HttpService
	) {}

	sendMessage() {
		this.chatService.sendMessage(this.globals.username + ': ' + this.message);
		this.message = '';
	}

	ngOnDestroy() {
		this.chatService.disconnectUser();
		this.http.addMessages();
	}

	privateChat(user) {
		if (user == this.globals.username) {
			console.log("You shouldn't chat with yourself, pick one of these other lovely people ;)");
		} else {
			this.chatService.startPrivateChat({ to: user, from: this.globals.username });
			this.privateChatwithUser.push(user);
		}
	}

	sendPrivateMessage(index) {
		this.chatService.sendPrivateMessage(
			this.privateRoomIds[index],
			this.globals.username + ': ' + this.privateMessage[index]
		);
		this.privateMessage[index] = '';
	}

	ngOnInit() {
		this.chatService = new ChatService();
		this.chatService.getUserList().subscribe((message: string[]) => {
			this.connectedUsers = message;
			console.log(message);
		});
		this.chatService
			.getMessages()
			.distinctUntilChanged()
			.filter((message: string) => message.trim().length > 0)
			.throttleTime(500)
			.subscribe((message: string) => {
				this.messages.push(message);
			});
		this.chatService.enterPrivateChat().subscribe((msgObj: any) => {
			this.privateRoomIds.push(msgObj.privateRoomId);
			if (msgObj.username != this.globals.username) {
				this.privateChatwithUser.push(msgObj.username);
				console.log('hi im here');
			}
			console.log(this.privateRoomIds);
			console.log(this.privateChatwithUser);
		});
		this.chatService.getPrivateMessage().subscribe(message => {
			console.log(message);

			if (!this.privateMessages[message.roomNr]) {
				this.privateMessages[message.roomNr] = [];
			}

			this.privateMessages[message.roomNr].push(message.message);
			console.log(this.privateRoomIds);
			console.log(this.privateMessages);
		});
		this.chatService.newUser(this.globals.username);
	}
}
