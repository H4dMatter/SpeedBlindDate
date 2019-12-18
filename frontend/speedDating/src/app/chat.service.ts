import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
// import {} from "";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
	private url = 'http://localhost:3000';
	private socket;
	private connectedUsers = [];

	constructor() {
		this.socket = io(this.url);
	}

	disconnectUser() {
		this.socket.disconnect();
	}

	public newUser(username) {
		this.socket.emit('new-user', username);
	}

	public getUserList() {
		return Observable.create(observer => {
			this.socket.on('new-user', message => {
				observer.next(message);
			});
		});
	}

	public sendMessage(message) {
		this.socket.emit('new-message', message);
	}

	public getMessages() {
		return Observable.create(observer => {
			this.socket.on('new-message', message => {
				observer.next(message);
			});
		});
	}
}
