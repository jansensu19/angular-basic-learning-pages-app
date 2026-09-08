import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Forms } from './forms';

describe('Forms', () => {
  let component: Forms;
  let fixture: ComponentFixture<Forms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forms],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Forms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
