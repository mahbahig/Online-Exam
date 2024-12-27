import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuizComponent } from './select-quiz.component';

describe('SelectQuizComponent', () => {
  let component: SelectQuizComponent;
  let fixture: ComponentFixture<SelectQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
