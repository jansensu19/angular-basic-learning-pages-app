import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavBar } from '../../../shared/components/nav-bar/nav-bar';
import { Footer } from '../../../shared/components/footer/footer';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-binding',
  imports: [CommonModule, FormsModule, RouterLink, NavBar, Footer, TranslatePipe],
  styleUrl: './binding.scss',
  templateUrl: './binding.html',
})
export class Binding {
  userName = 'Angular Learner';
  isButtonDisabled = false;
  avatarUrl = 'assets/svg/angular-logo.svg';
  searchQuery = 'Signals & Bindings';
  clickCount = 0;

  handleClick(): void {
    this.clickCount++;
  }

  toggleDisabled(): void {
    this.isButtonDisabled = !this.isButtonDisabled;
  }
}
