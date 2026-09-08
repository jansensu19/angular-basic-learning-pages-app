import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { NavBar } from '../../shared/components/nav-bar/nav-bar';
import { Footer } from '../../shared/components/footer/footer';
import { ProgressService } from '../../core/services/progress.service';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

import { CategorySummary, ProgressItem } from '../../core/models/progress.model';

export interface DashboardStats {
  total: number;
  completed: number;
  pending: number;
  percentage: number;
  isScanning: boolean;
  username: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [NavBar, Footer, RouterLink, TranslatePipe, UpperCasePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  readonly progressService = inject(ProgressService);
  readonly authService = inject(AuthService);

  readonly activeFilter = signal<'all' | 'directives' | 'binding' | 'forms' | 'router'>('all');

  readonly filteredItems = computed(() => {
    const filter = this.activeFilter();
    const items = this.progressService.items();
    if (filter === 'all') {
      return items;
    }
    return items.filter((item) => item.category === filter);
  });

  readonly strokeDashoffset = computed(() => {
    const percentage = this.progressService.overallPercentage();
    const circumference = 440; // 2 * PI * 70 ≈ 440
    return circumference - (circumference * percentage) / 100;
  });

  get stats(): DashboardStats {
    const total = this.progressService.totalCount();
    const completed = this.progressService.completedCount();
    return {
      total,
      completed,
      pending: total - completed,
      percentage: this.progressService.overallPercentage(),
      isScanning: this.progressService.isScanning(),
      username: this.authService.currentUser() || '',
    };
  }

  get currentFilter(): 'all' | 'directives' | 'binding' | 'forms' | 'router' {
    return this.activeFilter();
  }

  get categories(): CategorySummary[] {
    return this.progressService.categorySummaries();
  }

  get itemsList(): ProgressItem[] {
    return this.filteredItems();
  }

  get progressRingOffset(): number {
    return this.strokeDashoffset();
  }

  ngOnInit(): void {
    this.progressService.resetAndRescan();
  }

  scanCode(): void {
    this.progressService.resetAndRescan();
  }

  setFilter(category: 'all' | 'directives' | 'binding' | 'forms' | 'router'): void {
    this.activeFilter.set(category);
  }

  toggleItem(id: string): void {
    this.progressService.toggleItem(id);
  }

  markAll(completed: boolean): void {
    this.progressService.markAll(completed);
  }

  resetProgress(): void {
    this.progressService.resetProgress();
  }

  markCategory(category: 'directives' | 'binding' | 'forms' | 'router', completed: boolean): void {
    this.progressService.markCategory(category, completed);
  }
}
