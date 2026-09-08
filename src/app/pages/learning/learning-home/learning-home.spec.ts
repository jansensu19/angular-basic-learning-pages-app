import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LearningHome } from './learning-home';

describe('LearningHome', () => {
  let component: LearningHome;
  let fixture: ComponentFixture<LearningHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningHome],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
