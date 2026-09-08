import { Injectable, inject, signal, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private http = inject(HttpClient);
  private appRef = inject(ApplicationRef);

  currentLang = signal<string>('en');
  private translations = signal<Record<string, any>>({});

  constructor() {
    this.setLanguage('en');
  }

  setLanguage(lang: string) {
    this.http.get<Record<string, any>>(`/assets/i18n/${lang}.json`).subscribe({
    this.http.get<Record<string, any>>(`assets/i18n/${lang}.json`).subscribe({
      next: (data) => {
        this.translations.set(data);
        this.currentLang.set(lang);
        this.appRef.tick();
      },
      error: (err) => console.error(`Could not load ${lang}.json`, err),
    });
  }

  translate(key: string): string {
    const data = this.translations();
    
    const result = key.split('.').reduce<any>((prev, curr) => prev?.[curr], data);

    return typeof result === 'string' ? result : key;
  }
}