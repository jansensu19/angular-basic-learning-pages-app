import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { NavBar } from '../../../shared/components/nav-bar/nav-bar';
import { Footer } from '../../../shared/components/footer/footer';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-learning-home',
  imports: [NavBar, Footer, RouterLink, TranslatePipe, UpperCasePipe],
  templateUrl: './learning-home.html',
  styleUrl: './learning-home.scss',
})
export class LearningHome {
  readonly modules = [
    {
      id: 'directives',
      titleKey: 'learning.topic-directives-title',
      descKey: 'learning.topic-directives-desc',
      whatIsKey: 'learning.topic-directives-what-is',
      whatUseKey: 'learning.topic-directives-what-use',
      route: '/learning/directive',
      topics: ['@if & *ngIf', '@for & *ngFor', '@switch', '<ng-template>', 'ngComponentOutlet', 'ngClass & ngStyle', 'routerLink', 'ngModel'],
      color: '#1976d2',
    },
    {
      id: 'binding',
      titleKey: 'learning.topic-binding-title',
      descKey: 'learning.topic-binding-desc',
      whatIsKey: 'learning.topic-binding-what-is',
      whatUseKey: 'learning.topic-binding-what-use',
      route: '/learning/binding',
      topics: ['Interpolation {{ }}', 'Property Binding [prop]', 'Event Binding (event)', 'Two-Way Binding [(ngModel)]'],
      color: '#0288d1',
    },
    {
      id: 'forms',
      titleKey: 'learning.topic-forms-title',
      descKey: 'learning.topic-forms-desc',
      whatIsKey: 'learning.topic-forms-what-is',
      whatUseKey: 'learning.topic-forms-what-use',
      route: '/learning/forms',
      topics: ['FormsModule', 'ngForm directive', 'ngModel validation', 'Form status (.valid, .touched)'],
      color: '#7b1fa2',
    },
    {
      id: 'reactive-forms',
      titleKey: 'learning.topic-reactive-forms-title',
      descKey: 'learning.topic-reactive-forms-desc',
      whatIsKey: 'learning.topic-reactive-forms-what-is',
      whatUseKey: 'learning.topic-reactive-forms-what-use',
      route: '/learning/reactive-forms',
      topics: ['ReactiveFormsModule', 'FormGroup & FormControl', 'Built-in Validators', 'formControlName'],
      color: '#c2185b',
    },
    {
      id: 'router',
      titleKey: 'learning.topic-router-title',
      descKey: 'learning.topic-router-desc',
      whatIsKey: 'learning.topic-router-what-is',
      whatUseKey: 'learning.topic-router-what-use',
      route: '/learning/router',
      topics: ['Angular Router', 'routerLink directive', 'router.navigate()', 'Route parameters'],
      color: '#e64a19',
    },
  ];
}
