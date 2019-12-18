import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileFormComponent } from './profile-form/profile-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'chat', component: ChatComponent },
	{ path: 'profile', component: ProfileFormComponent },
	{ path: 'user', component: RegisterComponent },
	{ path: 'user/{username}', component: ShowUserComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
