import { Injectable, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProgressItem, CategorySummary, INITIAL_PROGRESS_ITEMS } from '../models/progress.model';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  private readonly STORAGE_KEY = 'angular_learning_progress';

  readonly items = signal<ProgressItem[]>(this.loadInitialItems());
  readonly isScanning = signal<boolean>(false);
  readonly lastScanned = signal<Date | null>(null);

  readonly totalCount = computed(() => this.items().length);

  readonly completedCount = computed(
    () => this.items().filter((item) => item.completed).length
  );

  readonly overallPercentage = computed(() => {
    const total = this.totalCount();
    if (total === 0) return 0;
    return Math.round((this.completedCount() / total) * 100);
  });

  readonly categorySummaries = computed<CategorySummary[]>(() => {
    const all = this.items();
    const categories: { key: 'directives' | 'binding' | 'forms' | 'router'; title: string; icon: string }[] = [
      { key: 'directives', title: 'Directives (Structural & Attribute)', icon: 'widgets' },
      { key: 'binding', title: 'Data Binding', icon: 'sync_alt' },
      { key: 'forms', title: 'Forms & Reactive Forms', icon: 'dynamic_form' },
      { key: 'router', title: 'Router & Navigation', icon: 'alt_route' },
    ];

    return categories.map((cat) => {
      const catItems = all.filter((i) => i.category === cat.key);
      const total = catItems.length;
      const completed = catItems.filter((i) => i.completed).length;
      const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
      return {
        key: cat.key,
        title: cat.title,
        icon: cat.icon,
        completed,
        total,
        percentage,
      };
    });
  });

  readonly itemsByCategory = computed(() => {
    const all = this.items();
    return {
      directives: all.filter((i) => i.category === 'directives'),
      binding: all.filter((i) => i.category === 'binding'),
      forms: all.filter((i) => i.category === 'forms'),
      router: all.filter((i) => i.category === 'router'),
    };
  });

  private loadInitialItems(): ProgressItem[] {
    if (!isPlatformBrowser(this.platformId)) {
      return INITIAL_PROGRESS_ITEMS.map((item) => ({ ...item }));
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return INITIAL_PROGRESS_ITEMS.map((item) => ({ ...item }));
      }

      const parsed: Array<{
        id: string;
        completed: boolean;
        autoDetected?: boolean;
        detectedSnippet?: string;
      }> = JSON.parse(stored);

      const completionMap = new Map<
        string,
        { completed: boolean; autoDetected?: boolean; detectedSnippet?: string }
      >(parsed.map((p) => [p.id, p]));

      return INITIAL_PROGRESS_ITEMS.map((item) => {
        const saved = completionMap.get(item.id);
        return {
          ...item,
          completed: saved ? Boolean(saved.completed) : item.completed,
          autoDetected: saved?.autoDetected,
          detectedSnippet: saved?.detectedSnippet,
        };
      });
    } catch {
      return INITIAL_PROGRESS_ITEMS.map((item) => ({ ...item }));
    }
  }

  private saveState(items: ProgressItem[]): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const toStore = items.map(({ id, completed, autoDetected, detectedSnippet }) => ({
        id,
        completed,
        autoDetected,
        detectedSnippet,
      }));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(toStore));
    } catch (err) {
      console.error('Failed to save learning progress:', err);
    }
  }

  toggleItem(id: string): void {
    this.items.update((current) => {
      const updated = current.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              autoDetected: !item.completed ? item.autoDetected : false,
            }
          : item
      );
      this.saveState(updated);
      return updated;
    });
  }

  setItemCompleted(id: string, completed: boolean): void {
    this.items.update((current) => {
      const updated = current.map((item) =>
        item.id === id ? { ...item, completed } : item
      );
      this.saveState(updated);
      return updated;
    });
  }

  markCategory(category: 'directives' | 'binding' | 'forms' | 'router', completed: boolean): void {
    this.items.update((current) => {
      const updated = current.map((item) =>
        item.category === category ? { ...item, completed } : item
      );
      this.saveState(updated);
      return updated;
    });
  }

  markAll(completed: boolean): void {
    this.items.update((current) => {
      const updated = current.map((item) => ({
        ...item,
        completed,
        autoDetected: completed ? item.autoDetected : false,
        detectedSnippet: completed ? item.detectedSnippet : undefined,
      }));
      this.saveState(updated);
      return updated;
    });
  }

  resetProgress(): void {
    this.markAll(false);
  }

  async resetAndRescan(): Promise<{ scanned: boolean; detectedCount: number }> {
    this.resetProgress();
    return this.scanLearningCode();
  }

  async scanLearningCode(): Promise<{ scanned: boolean; detectedCount: number }> {
    if (!isPlatformBrowser(this.platformId)) {
      return { scanned: false, detectedCount: 0 };
    }

    this.isScanning.set(true);

    try {
      const fetchFile = async (url: string): Promise<string> => {
        try {
          return await firstValueFrom(this.http.get(url, { responseType: 'text' }));
        } catch {
          return '';
        }
      };

      const [
        dirHtml,
        dirTs,
        bindHtml,
        bindTs,
        formsHtml,
        formsTs,
        reactiveHtml,
        reactiveTs,
        routerHtml,
        routerTs,
      ] = await Promise.all([
        fetchFile('/assets/learning-source/directive/directive.html'),
        fetchFile('/assets/learning-source/directive/directive.ts'),
        fetchFile('/assets/learning-source/binding/binding.html'),
        fetchFile('/assets/learning-source/binding/binding.ts'),
        fetchFile('/assets/learning-source/forms/forms.html'),
        fetchFile('/assets/learning-source/forms/forms.ts'),
        fetchFile('/assets/learning-source/reactive-forms/reactive-forms.html'),
        fetchFile('/assets/learning-source/reactive-forms/reactive-forms.ts'),
        fetchFile('/assets/learning-source/router/router.html'),
        fetchFile('/assets/learning-source/router/router.ts'),
        fetchFile('assets/learning-source/directive/directive.html'),
        fetchFile('assets/learning-source/directive/directive.ts'),
        fetchFile('assets/learning-source/binding/binding.html'),
        fetchFile('assets/learning-source/binding/binding.ts'),
        fetchFile('assets/learning-source/forms/forms.html'),
        fetchFile('assets/learning-source/forms/forms.ts'),
        fetchFile('assets/learning-source/reactive-forms/reactive-forms.html'),
        fetchFile('assets/learning-source/reactive-forms/reactive-forms.ts'),
        fetchFile('assets/learning-source/router/router.html'),
        fetchFile('assets/learning-source/router/router.ts'),
      ]);

      const cleanSource = (html: string): string => {
        const sandbox = extractSandboxContent(html);
        return sandbox.replace(/<!--[\s\S]*?-->/g, '').trim();
      };

      const dirSandbox = cleanSource(dirHtml);
      const bindSandbox = cleanSource(bindHtml);
      const formsSandbox = cleanSource(formsHtml);
      const reactiveSandbox = cleanSource(reactiveHtml);
      const routerSandbox = cleanSource(routerHtml);

      const check = (source: string, regex: RegExp): { detected: boolean; snippet?: string } => {
        if (!source) return { detected: false };
        const m = source.match(regex);
        if (!m) return { detected: false };
        return { detected: true, snippet: m[0].trim().slice(0, 45) };
      };

      const rules: Record<string, { detected: boolean; snippet?: string }> = {
        'dir-if': check(dirSandbox, /\*ngIf\s*=\s*["'][^"']+["']|@if\s*\([^)]+\)/),
        'dir-for': check(dirSandbox, /\*ngFor\s*=\s*["'][^"']+["']|@for\s*\([^)]+\)/),
        'dir-switch': check(dirSandbox, /\*ngSwitch\b|\[ngSwitch\]|@switch\s*\([^)]+\)/),
        'dir-template': check(dirSandbox, /<\s*ng-template\b[^>]*>/),
        'dir-component': check(dirSandbox, /\[\s*ngComponentOutlet\s*\]|\bngComponentOutlet\b/i),

        'dir-class': check(dirSandbox, /\[ngClass\](?:\s*=\s*(?:"[^"]*"|'[^']*'))?|\[class\.[a-zA-Z0-9_-]+\](?:\s*=\s*(?:"[^"]*"|'[^']*'))?/),
        'dir-style': check(dirSandbox, /\[ngStyle\](?:\s*=\s*(?:"[^"]*"|'[^']*'))?|\[style\.[a-zA-Z0-9_-]+\](?:\s*=\s*(?:"[^"]*"|'[^']*'))?/),
        'dir-routerlink': check(dirSandbox, /\[routerLink\](?:\s*=\s*(?:"[^"]*"|'[^']*'))?|\brouterLink\s*=\s*(?:"[^"]*"|'[^']*')|\brouterLink\b/),
        'dir-model': check(dirSandbox, /\[\(ngModel\)\](?:\s*=\s*(?:"[^"]*"|'[^']*'))?|\[ngModel\](?:\s*=\s*(?:"[^"]*"|'[^']*'))?|\bngModel\b/),

        'bind-interp': check(bindSandbox, /\{\{[\s\S]*?\}\}/),
        'bind-prop': check(bindSandbox, /\[(?!\()([a-zA-Z0-9_.-]+)\]\s*=/),
        'bind-event': check(bindSandbox, /\((?!\))([a-zA-Z0-9_.-]+)\)\s*=/),
        'bind-twoway': check(bindSandbox, /\[\(([a-zA-Z0-9_.-]+)\)\]\s*=/),

        'form-template': check(formsSandbox, /#([a-zA-Z0-9_]+)\s*=\s*["']ngForm["']|\bngForm\b|\[\(ngModel\)\]/),
        'form-reactive': check(reactiveSandbox, /\[formGroup\]|\bformGroupName\b|\bformControlName\b|\[formControl\]/i),

        'router-nav': check(routerSandbox, /\[routerLink\]|\brouterLink\s*=|router\.navigate|\(click\)="[^"]*navigate/i),
      };

      let detectedCount = 0;
      this.items.update((current) => {
        const updated = current.map((item) => {
          const res = rules[item.id];
          if (res?.detected) {
            detectedCount++;
            return {
              ...item,
              completed: true,
              autoDetected: true,
              detectedSnippet: res.snippet,
            };
          }
          return item;
        });
        this.saveState(updated);
        return updated;
      });

      this.lastScanned.set(new Date());
      return { scanned: true, detectedCount };
    } finally {
      this.isScanning.set(false);
    }
  }
}

export function extractSandboxContent(html: string): string {
  if (!html) return '';
  const match = html.match(/<div[^>]*class=["'][^"']*sandbox-content[^"']*["'][^>]*>/i);
  if (!match || match.index === undefined) {
    if (
      !html.includes('topic-explanation-card') &&
      !html.includes('app-nav-bar') &&
      !html.includes('practice-sandbox-container')
    ) {
      return html;
    }
    return '';
  }

  const startIndex = match.index + match[0].length;
  let depth = 1;
  const tagRegex = /<\/?div\b[^>]*>/gi;
  tagRegex.lastIndex = startIndex;

  let tagMatch: RegExpExecArray | null;
  while ((tagMatch = tagRegex.exec(html)) !== null) {
    if (tagMatch[0].startsWith('</')) {
      depth--;
      if (depth === 0) {
        return html.slice(startIndex, tagMatch.index);
      }
    } else if (!tagMatch[0].endsWith('/>')) {
      depth++;
    }
  }

  const sectionClose = html.indexOf('</section>', startIndex);
  if (sectionClose !== -1) {
    return html.slice(startIndex, sectionClose);
  }

  return html.slice(startIndex);
}
