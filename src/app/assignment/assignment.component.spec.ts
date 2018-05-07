import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentComponent } from './assignment.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FilterPipeConsultantNamePipe} from '../filter-pipe-consultantName/filter-pipe-consultantName.pipe';
import {OrderPipe} from '../order-pipe/ngx-order.pipe';
import {FilterPipeRegionPipe} from '../filter-pipe-region/filter-pipe-region.pipe';
import {FilterPipeAssignedPipe} from '../filter-pipe-assigned/filter-pipe-assigned.pipe';

describe('AssignmentComponent', () => {
  let component: AssignmentComponent;
  let fixture: ComponentFixture<AssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ AssignmentComponent,
        FilterPipeRegionPipe,
        FilterPipeConsultantNamePipe,
        OrderPipe,
        FilterPipeAssignedPipe
      ]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
