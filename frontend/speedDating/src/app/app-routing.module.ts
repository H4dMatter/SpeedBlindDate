import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'profile', component: ProfileFormComponent, canActivate: [AuthGuard]},
	{ path: 'user', component: RegisterComponent },
	{ path: 'user/{username}', component: ShowUserComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
