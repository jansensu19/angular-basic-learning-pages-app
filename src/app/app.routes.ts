import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Login } from './pages/login/login';
import { SignUp } from './pages/sign-up/sign-up';
import { Dashboard } from './pages/dashboard/dashboard';
import { loginAuthGuard } from './core/guard/login-auth-guard';
import { LearningHome } from './pages/learning/learning-home/learning-home';
import { Directive } from './pages/learning/directive/directive';
import { Binding } from './pages/learning/binding/binding';
import { Forms } from './pages/learning/forms/forms';
import { ReactiveForms } from './pages/learning/reactive-forms/reactive-forms';
import { Router as LearningRouter } from './pages/learning/router/router';
import { AnswerHome } from './pages/answer/answer-home/answer-home';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: Login },
  { path: 'signup', component: SignUp },
  { path: 'dashboard', component: Dashboard, canActivate: [loginAuthGuard] },
  { path: 'learning', component: LearningHome },
  { path: 'answer', component: AnswerHome },
  { path: 'learning/directive', component: Directive },
  { path: 'learning/directives-templates-animations', component: Directive },
  { path: 'learning/binding', component: Binding },
  { path: 'learning/forms', component: Forms },
  { path: 'learning/reactive-forms', component: ReactiveForms },
  { path: 'learning/router', component: LearningRouter },

  { path: '**', redirectTo: '' },
];