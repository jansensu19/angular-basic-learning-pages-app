import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router as AngularRouter, RouterLink } from '@angular/router';
import { NavBar } from '../../../shared/components/nav-bar/nav-bar';
import { Footer } from '../../../shared/components/footer/footer';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-router',
  imports: [CommonModule, RouterLink, NavBar, Footer, TranslatePipe],
  styleUrl: './router.scss',
  templateUrl: './router.html',
})
export class Router {
  private readonly router = inject(AngularRouter);

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToLearningHome(): void {
    this.router.navigate(['/learning']);
  }
}
