import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule} from '@angular/forms';
import { FilterPipeRegionPipe } from '../filter-pipe-region/filter-pipe-region.pipe';
import { FilterPipeConsultantNamePipe } from '../filter-pipe-consultantName/filter-pipe-consultantName.pipe';
import { OrderPipe } from '../order-pipe/ngx-order.pipe';
import { AssignConsultantComponent } from './assign-consultant.component';

describe('AssignConsultantComponent', () => {
  let component: AssignConsultantComponent;
  let fixture: ComponentFixture<AssignConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [AssignConsultantComponent,
        FilterPipeRegionPipe,
        FilterPipeConsultantNamePipe,
        OrderPipe
      ]
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
