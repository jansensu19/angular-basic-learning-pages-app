import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { TranslationService } from '../../core/services/translation.service';
import { DialogService } from '../../core/services/dialog.service';
import { MatFormFieldModule, MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    MatInput,
  ],
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private router = inject(Router);
  private translationService = inject(TranslationService);
  private dialogService = inject(DialogService);
  private authService = inject(AuthService);

  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();
    const stored = localStorage.getItem('savedUserAngularLearningPageApp');

    if (!stored) {
      this.dialogService.open(
        'Notice',
        this.translationService.translate('login-page.error.no-user-found'),
        false
      );
      return;
    }

    try {
      const user = JSON.parse(stored);
      if (user.username === username && user.password === password) {
        this.authService.startSession(username);
        this.dialogService
          .open(this.translationService.translate('login-page.success.title'), this.translationService.translate('login-page.success.message'), true)
          .afterClosed()
          .subscribe(() => this.router.navigate(['/dashboard']));
      } else {
        this.dialogService.open(
          'Error',
          this.translationService.translate('login-page.error.invalid-credentials'),
          false
        );
      }
    } catch {
      this.dialogService.open(
        'Error',
        this.translationService.translate('login-page.error.invalid-credentials'),
        false
      );
    }
  }
}