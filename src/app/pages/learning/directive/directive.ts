import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavBar } from '../../../shared/components/nav-bar/nav-bar';
import { Footer } from '../../../shared/components/footer/footer';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-directive',
  imports: [CommonModule, RouterLink, FormsModule, NavBar, Footer, TranslatePipe],
  styleUrl: './directive.scss',
  templateUrl: './directive.html',
})
export class Directive {
  isLoading = true;

  toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }
}
