import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Directive } from './directive';

describe('Directive', () => {
  let component: Directive;
  let fixture: ComponentFixture<Directive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Directive],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Directive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
