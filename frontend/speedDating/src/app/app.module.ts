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

@NgModule({
	declarations: [
		AppComponent,
		ProfileComponent,
		NavbarComponent,
		ProfileFormComponent
	],
	imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}




import { FormsModule } from "@angular/forms";

import { HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShowUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
