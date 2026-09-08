import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBar } from '../../../shared/components/nav-bar/nav-bar';
import { Footer } from '../../../shared/components/footer/footer';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-answer-home',
  imports: [NavBar, Footer, RouterLink, TranslatePipe],
  templateUrl: './answer-home.html',
  styleUrl: './answer-home.scss',
})
export class AnswerHome {
  readonly directiveCode = `<!-- Structural Directives -->
<div *ngIf="!isLoading">Content visible with *ngIf</div>

@if (isLoading) {
  <p>Loading content with @if block...</p>
}

@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
}

@switch (currentStatus) {
  @case ('active') { <span>Active</span> }
  @default { <span>Default</span> }
}

<ng-template #customTpl>Custom Template block</ng-template>
<ng-container *ngComponentOutlet="activeComponent"></ng-container>

<!-- Attribute Directives -->
<div [ngClass]="{ 'is-highlighted': isSpecial, 'text-muted': !isSpecial }">Styled Class</div>
<div [ngStyle]="{ color: textColor, fontSize: '16px' }">Styled Inline</div>
<a [routerLink]="['/dashboard']">Navigate to Dashboard</a>
<input [(ngModel)]="username" placeholder="Two-way model" />`;

  readonly bindingCode = `<!-- 1. Interpolation: embed values into template -->
<h3>Hello, {{ userName }}!</h3>

<!-- 2. Property Binding: pass data down to DOM properties -->
<button [disabled]="isSubmitting">Submit</button>
<img [src]="avatarUrl" alt="User avatar" />

<!-- 3. Event Binding: capture user interactions -->
<button (click)="handleClick($event)">Click Me</button>
<input (input)="onInputChange($event)" />

<!-- 4. Two-Way Binding: bidirectional sync with [(ngModel)] -->
<input [(ngModel)]="searchQuery" placeholder="Type to search..." />
<p>Searching for: {{ searchQuery }}</p>`;

  readonly formsCode = `<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
  <label for="fullName">Full Name</label>
  <input
    id="fullName"
    name="fullName"
    [(ngModel)]="user.fullName"
    required
    #nameCtrl="ngModel"
  />
  @if (nameCtrl.invalid && nameCtrl.touched) {
    <span class="error">Name is required</span>
  }

  <button type="submit" [disabled]="userForm.invalid">Submit Form</button>
</form>`;

  readonly reactiveFormsCode = `// In TypeScript:
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class ReactiveForms {
  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}

<!-- In Template: -->
<form [formGroup]="profileForm" (ngSubmit)="onSave()">
  <input formControlName="username" placeholder="Username" />
  <input formControlName="email" type="email" placeholder="Email" />
  <button type="submit" [disabled]="profileForm.invalid">Save Profile</button>
</form>`;

  readonly routerCode = `<!-- Declarative Navigation with routerLink -->
<a [routerLink]="['/dashboard']">Dashboard</a>
<button [routerLink]="['/learning', 'directive']">Directives Topic</button>

// Programmatic Navigation in TypeScript:
import { Router } from '@angular/router';

export class RouterPage {
  private router = inject(Router);

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}`;
}

