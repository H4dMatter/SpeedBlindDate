import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';

import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat.service';



@NgModule({
	declarations: [
		AppComponent,
		ProfileComponent,
		NavbarComponent,
		ProfileFormComponent,
		LoginComponent,
		RegisterComponent,
		ShowUserComponent,
		ChatComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
    ReactiveFormsModule,
		FlashMessagesModule.forRoot()
	],
  exports: [
    NavbarComponent
  ],
	providers: [HttpClientModule, AuthService, AuthGuard, ChatService, FlashMessagesService],
	bootstrap: [AppComponent]
})
export class AppModule {}
