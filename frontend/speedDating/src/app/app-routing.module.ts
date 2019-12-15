import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}


const routes: Routes = [
  {path: '', component:LoginComponent},
  { path: 'profile', component: ProfileFormComponent },
  {path: 'user', component:RegisterComponent}
];

