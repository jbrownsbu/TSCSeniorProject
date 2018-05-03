import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantCreateComponent } from './consultant-create.component';

describe('ConsultantCreateComponent', () => {
  let component: ConsultantCreateComponent;
  let fixture: ComponentFixture<ConsultantCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
