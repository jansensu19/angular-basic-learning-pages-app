import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Login } from './pages/login/login';
import { SignUp } from './pages/sign-up/sign-up';
import { Dashboard } from './pages/dashboard/dashboard';
import { loginAuthGuard } from './core/guard/login-auth-guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: Login },
  { path: 'signup', component: SignUp },
  { path: 'dashboard', component: Dashboard, canActivate: [loginAuthGuard] },

  { path: '**', redirectTo: '' },
];