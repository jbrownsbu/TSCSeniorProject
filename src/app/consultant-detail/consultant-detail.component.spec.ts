import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantDetailComponent } from './consultant-detail.component';

describe('ConsultantDetailComponent', () => {
  let component: ConsultantDetailComponent;
  let fixture: ComponentFixture<ConsultantDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
