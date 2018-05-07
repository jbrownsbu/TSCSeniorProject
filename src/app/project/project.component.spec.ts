import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FilterPipeLanguagePipe} from '../filter-pipe-language/filter-pipe-language.pipe';
import {FilterPipeRegionPipe} from '../filter-pipe-region/filter-pipe-region.pipe';
import {FilterPipeProjectNamePipe} from '../filter-pipe-projectName/filter-pipe-projectName.pipe';
import {OrderPipe} from '../order-pipe/ngx-order.pipe';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ ProjectComponent,
        FilterPipeLanguagePipe,
        FilterPipeRegionPipe,
        FilterPipeProjectNamePipe,
        OrderPipe,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
