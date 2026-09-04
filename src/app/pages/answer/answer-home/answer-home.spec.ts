import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerHome } from './answer-home';

describe('AnswerHome', () => {
  let component: AnswerHome;
  let fixture: ComponentFixture<AnswerHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerHome],
    }).compileComponents();

    fixture = TestBed.createComponent(AnswerHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
