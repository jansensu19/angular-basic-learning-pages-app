import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavBar } from '../../../shared/components/nav-bar/nav-bar';
import { Footer } from '../../../shared/components/footer/footer';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-forms',
  imports: [CommonModule, FormsModule, RouterLink, NavBar, Footer, TranslatePipe],
  styleUrl: './forms.scss',
  templateUrl: './forms.html',
})
export class Forms {
  formData = {
    fullName: '',
    email: '',
    preferredTrack: 'directives',
  };

  isSubmitted = false;

  onSubmit(form: any): void {
    if (form.valid) {
      this.isSubmitted = true;
    }
  }

  onReset(form: any): void {
    form.reset();
    this.isSubmitted = false;
  }
}
