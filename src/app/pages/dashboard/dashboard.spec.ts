import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with overall percentage and 16 total items', () => {
    expect(component.progressService.totalCount()).toBe(16);
    expect(component.filteredItems().length).toBe(16);
    expect(component.activeFilter()).toBe('all');
  });

  it('should filter items by category', () => {
    component.setFilter('directives');
    expect(component.activeFilter()).toBe('directives');
    expect(component.filteredItems().length).toBe(9);

    component.setFilter('binding');
    expect(component.filteredItems().length).toBe(4);

    component.setFilter('forms');
    expect(component.filteredItems().length).toBe(2);

    component.setFilter('router');
    expect(component.filteredItems().length).toBe(1);
  });

  it('should call resetAndRescan on scanCode', () => {
    const rescanSpy = vi.spyOn(component.progressService, 'resetAndRescan');
    component.scanCode();
    expect(rescanSpy).toHaveBeenCalled();
  });
});
