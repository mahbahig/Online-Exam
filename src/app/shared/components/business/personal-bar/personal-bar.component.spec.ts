import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalBarComponent } from './personal-bar.component';

describe('PersonalBarComponent', () => {
  let component: PersonalBarComponent;
  let fixture: ComponentFixture<PersonalBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
