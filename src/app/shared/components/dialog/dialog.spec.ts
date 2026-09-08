import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from './dialog';

describe('Dialog', () => {
  let component: Dialog;
  let fixture: ComponentFixture<Dialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dialog],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: 'Test', message: 'Test message', isSuccess: true },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
