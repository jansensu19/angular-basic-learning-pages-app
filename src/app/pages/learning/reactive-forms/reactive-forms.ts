import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavBar } from '../../../shared/components/nav-bar/nav-bar';
import { Footer } from '../../../shared/components/footer/footer';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-reactive-forms',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NavBar, Footer, TranslatePipe],
  styleUrl: './reactive-forms.scss',
  templateUrl: './reactive-forms.html',
})
export class ReactiveForms {
  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  isSubmitted = false;

  onSave(): void {
    if (this.profileForm.valid) {
      this.isSubmitted = true;
    }
  }

  onReset(): void {
    this.profileForm.reset();
    this.isSubmitted = false;
  }
}
