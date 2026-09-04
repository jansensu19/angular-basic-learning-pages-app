import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogService } from '../../../core/services/dialog.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
    imports: [FormsModule, TranslatePipe, MatFormFieldModule, MatInputModule, RouterLink, ReactiveFormsModule],

  styleUrl: './nav-bar.scss',
  templateUrl: './nav-bar.html',
})
export class NavBar {
  private router = inject(Router);
  translationService = inject(TranslationService);
  private dialogService = inject(DialogService);
  authService = inject(AuthService);

  isMenuOpen = false;
  isLoginBoxOpen = false;
  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  

  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleLoginBox() {
    this.isLoginBoxOpen = !this.isLoginBoxOpen;
  }

  hideLoginBox() {
    this.isLoginBoxOpen = false;
  }

  loginHome() {
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
        this.hideLoginBox();
        this.loginForm.reset();
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

  logout() {
    this.authService.logout();
  }
}