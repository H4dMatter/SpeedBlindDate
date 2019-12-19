import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { FlashMessagesModule } from 'angular2-flash-messages';

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
		FlashMessagesModule.forRoot()
	],
	providers: [AuthService, AuthGuard, ChatService],
	bootstrap: [AppComponent]
})
export class AppModule {}
