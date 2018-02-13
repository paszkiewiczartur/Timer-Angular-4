import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './../core/home/home.component';

const authRoutes: Routes = [
    { path: 'signup', component: SignupComponent}, 
    { path: 'signin', component: SigninComponent},
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule{

}