import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProgressService } from './progress.service';

describe('ProgressService', () => {
  let service: ProgressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProgressService);
    httpMock = TestBed.inject(HttpTestingController);
    service.resetProgress();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with all items and 0% completion when reset', () => {
    expect(service.totalCount()).toBe(16);
    expect(service.completedCount()).toBe(0);
    expect(service.overallPercentage()).toBe(0);
  });

  it('should toggle an item and update percentages', () => {
    const item = service.items()[0];
    service.toggleItem(item.id);

    expect(service.completedCount()).toBe(1);
    expect(service.overallPercentage()).toBe(Math.round((1 / 16) * 100));

    // Toggle back
    service.toggleItem(item.id);
    expect(service.completedCount()).toBe(0);
    expect(service.overallPercentage()).toBe(0);
  });

  it('should mark an entire category as complete', () => {
    service.markCategory('forms', true);
    const formsCategory = service.categorySummaries().find((c) => c.key === 'forms');

    expect(formsCategory).toBeDefined();
    expect(formsCategory?.percentage).toBe(100);
    expect(formsCategory?.completed).toBe(formsCategory?.total);
  });

  it('should mark all items completed and reset', () => {
    service.markAll(true);
    expect(service.overallPercentage()).toBe(100);
    expect(service.completedCount()).toBe(service.totalCount());

    service.resetProgress();
    expect(service.overallPercentage()).toBe(0);
    expect(service.completedCount()).toBe(0);
  });

  it('should auto-detect ngIf in template when scanning code', async () => {
    const scanPromise = service.scanLearningCode();

    const reqs = httpMock.match((r) => r.url.startsWith('assets/learning-source/'));
    for (const req of reqs) {
      if (req.request.url.includes('directive.html')) {
        req.flush('<div *ngIf="!isLoading"><p>loaded</p></div>');
      } else {
        req.flush('');
      }
    }

    const result = await scanPromise;
    expect(result.scanned).toBe(true);

    const ifItem = service.items().find((i) => i.id === 'dir-if');
    expect(ifItem?.completed).toBe(true);
    expect(ifItem?.autoDetected).toBe(true);
    expect(ifItem?.detectedSnippet).toContain('*ngIf="!isLoading"');
  });

  it('should ignore header chips / nav-bar and only detect inside .sandbox-content', async () => {
    const scanPromise = service.scanLearningCode();

    const templateWithHeaderChips = `
      <app-nav-bar></app-nav-bar>
      <header class="topic-explanation-card">
        <a routerLink="/dashboard">Back</a>
        <div class="competencies-chips">
          <span class="chip">ngIf / @if</span>
          <span class="chip">ngFor / @for</span>
          <span class="chip">ngClass</span>
        </div>
      </header>
      <section class="practice-sandbox-container">
        <div class="sandbox-content">
          <!-- User's Practice Code -->
          <button [ngClass]="'btn-active'">Click</button>
        </div>
      </section>
      <app-footer></app-footer>
    `;

    const reqs = httpMock.match((r) => r.url.startsWith('assets/learning-source/'));
    for (const req of reqs) {
      if (req.request.url.includes('directive.html')) {
        req.flush(templateWithHeaderChips);
      } else {
        req.flush('');
      }
    }

    const result = await scanPromise;
    expect(result.scanned).toBe(true);

    // ngIf should NOT be detected because it was only in the header chips!
    const ifItem = service.items().find((i) => i.id === 'dir-if');
    expect(ifItem?.completed).toBe(false);

    // routerLink should NOT be detected because it was only in the header/nav!
    const routerLinkItem = service.items().find((i) => i.id === 'dir-routerlink');
    expect(routerLinkItem?.completed).toBe(false);

    // ngClass SHOULD be detected because it is inside .sandbox-content!
    const classItem = service.items().find((i) => i.id === 'dir-class');
    expect(classItem?.completed).toBe(true);
    expect(classItem?.detectedSnippet).toContain('[ngClass]="\'btn-active\'"');
  });

  it('should reset progress and rescan fresh when calling resetAndRescan()', async () => {
    // First manually mark all
    service.markAll(true);
    expect(service.completedCount()).toBe(16);

    const rescanPromise = service.resetAndRescan();

    const reqs = httpMock.match((r) => r.url.startsWith('assets/learning-source/'));
    for (const req of reqs) {
      if (req.request.url.includes('binding.html')) {
        req.flush('<div class="sandbox-content"><p>{{ userName }}</p></div>');
      } else {
        req.flush('<div class="sandbox-content"><!-- User practice --></div>');
      }
    }

    const result = await rescanPromise;
    expect(result.scanned).toBe(true);
    expect(result.detectedCount).toBe(1);

    // Only the binding interpolation should be complete, all others reset to false
    expect(service.completedCount()).toBe(1);
    const interp = service.items().find((i) => i.id === 'bind-interp');
    expect(interp?.completed).toBe(true);
  });
});
