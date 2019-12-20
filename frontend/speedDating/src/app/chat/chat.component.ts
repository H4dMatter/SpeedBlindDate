import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Globals } from '../globals';
import { HttpService } from '../http.service';

import { ProfileComponent } from '../profile/profile.component';
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

	otherPersonsProfile: any = {
		firstName: null,
		lastName: null,
		age: null,
		hobbies: null,
		gender: null,
		preferences: {
			genderPref: null,
			ageRange: {
				minAge: null,
				maxAge: null
			}
		}
	};
	showOtherPersonsProfile = false;

	constructor(
		private chatService: ChatService,
		public globals: Globals,
		public http: HttpService
	) {}

	ngOnDestroy() {
		this.chatService.disconnectUser();
		var chatLogs = this.privateMessages.filter(function(el) {
			return el != null && el.length != 0;
		});
		console.log(chatLogs);
		var msgObj = { betweenUsers: [], chatLog: [] };
		this.privateChatwithUser.forEach((user, index) => {
			console.log('Chat between ' + this.globals.username + ' and ' + user + ' has ended ');
			console.log(chatLogs[index]);
			let betweenUsers: string[] = [this.globals.username, user].sort();
			msgObj = { betweenUsers: betweenUsers, chatLog: chatLogs[index] };
		});
		if (msgObj.chatLog == undefined) console.log('No Messages to save');
		else if (msgObj.betweenUsers.length == 2 && msgObj.chatLog.length > 0) {
			this.http.addMessages(msgObj).subscribe((message: string) => {
				console.log(message);
			});
		} else {
			console.log('Something went wrong with your private chats!');
		}
		this.showOtherPersonsProfile = false;
	}

	sendMessage() {
		this.chatService.sendMessage(this.globals.username + ': ' + this.message);
		this.message = '';
	}

	showTheirProfile(index) {
		console.log('show profile of ' + this.privateChatwithUser[index]);
		this.http.getOtherPersonsProfile(this.privateChatwithUser[index]).subscribe(message => {
			console.log(message);
			this.otherPersonsProfile = message;
			this.showOtherPersonsProfile = true;
		});
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
