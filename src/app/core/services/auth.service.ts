import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

interface SessionData {
  username: string;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly SESSION_KEY = 'user_session_angular_app';
  private readonly TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

  currentUser = signal<string | null>(null);
  isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    this.restoreSession();
  }

  startSession(username: string) {
    if (!this.isBrowser) return;

    const expiresAt = Date.now() + this.TWELVE_HOURS_MS;
    const session: SessionData = { username, expiresAt };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    this.currentUser.set(username);
  }

  private restoreSession() {
    if (!this.isBrowser) return;

    const stored = localStorage.getItem(this.SESSION_KEY);
    if (!stored) return;

    try {
      const session: SessionData = JSON.parse(stored);
      
      if (Date.now() > session.expiresAt) {
        console.warn('Session expired after 12 hours. Logging out.');
        this.logout();
      } else {
        this.currentUser.set(session.username);
      }
    } catch {
      this.logout();
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem(this.SESSION_KEY);
    }
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }
}