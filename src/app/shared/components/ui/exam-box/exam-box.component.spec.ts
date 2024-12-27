import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamBoxComponent } from './exam-box.component';

describe('ExamBoxComponent', () => {
  let component: ExamBoxComponent;
  let fixture: ComponentFixture<ExamBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
