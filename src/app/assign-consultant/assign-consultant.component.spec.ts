import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignConsultantComponent } from './assign-consultant.component';

describe('AssignConsultantComponent', () => {
  let component: AssignConsultantComponent;
  let fixture: ComponentFixture<AssignConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
