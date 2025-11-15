import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { SignupComponent } from './Components/Authentication/signup/signup.component';
import { loginGuard } from './Services/Authentication/login.guard';
import { HomeComponent } from './Components/Dashboard/home/home.component';
import { authGuard } from './Services/Authentication/auth.guard';
import { ChatpanelComponent } from './Components/Dashboard/chatpanel/chatpanel.component';

// canActivate is a route gaurd executed to check if router should navigate to the route.
const routes: Routes = [
  // dashboard routes
  {
    path: 'chat',
    canActivate: [authGuard],
    component: HomeComponent,
    children: [
      { path: 'new', component: ChatpanelComponent },
      { path: ':chatId', component: ChatpanelComponent },
    ],
  },

  // login to access dashboard
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [loginGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
