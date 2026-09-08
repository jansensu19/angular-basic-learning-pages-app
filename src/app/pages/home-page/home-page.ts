import { Component, inject } from '@angular/core';
import { NavBar } from '../../shared/components/nav-bar/nav-bar';
import { Footer } from '../../shared/components/footer/footer';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [NavBar, Footer, RouterLink, TranslatePipe],
  selector: 'app-home-page',
  styleUrl: './home-page.scss',
  templateUrl: './home-page.html',
})
export class HomePage {
  private router = inject(Router);
  public authService = inject(AuthService);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
