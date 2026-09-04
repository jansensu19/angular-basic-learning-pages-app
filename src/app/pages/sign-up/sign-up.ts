import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { DialogService } from '../../core/services/dialog.service';
import { TranslationService } from '../../core/services/translation.service';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule, TranslatePipe, MatFormFieldModule, MatInputModule, RouterLink,],
  selector: 'app-sign-up',
  styleUrl: './sign-up.scss',
  templateUrl: './sign-up.html',
})
export class SignUp {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  private dialogService = inject(DialogService);
  private translationService = inject(TranslationService);
  private router = inject(Router);


  signUp() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const fileContent =
      `--- NEW USER SIGN-UP ---
      Username: ${this.username}
      Email: ${this.email}
      Password: ${this.password}
      Date: ${new Date().toLocaleString()}
      ------------------------
      `;

    localStorage.setItem(
      'savedUserAngularLearningPageApp',
      JSON.stringify({ username: this.username, password: this.password })
    );

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.username}-login.txt`;
    link.click();
    window.URL.revokeObjectURL(url);

    console.log('Login credentials saved to text file!');
    this.dialogService
          .open(
            this.translationService.translate('sign-up.success.title'),
            this.translationService.translate('sign-up.success.message'),
            true
          )
          .afterClosed()
          .subscribe(() => {
            this.router.navigate(['/']);
          });
  }
}