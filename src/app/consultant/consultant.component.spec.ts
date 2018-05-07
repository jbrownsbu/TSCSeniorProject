import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConsultantComponent } from './consultant.component';
import { FormsModule} from '@angular/forms';
import { FilterPipeRegionPipe } from '../filter-pipe-region/filter-pipe-region.pipe';
import { FilterPipeConsultantNamePipe } from '../filter-pipe-consultantName/filter-pipe-consultantName.pipe';
import { OrderPipe } from '../order-pipe/ngx-order.pipe';

describe('ConsultantComponent', () => {
  let component: ConsultantComponent;
  let fixture: ComponentFixture<ConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
      FormsModule,
      HttpClientTestingModule
      ],
      declarations: [ ConsultantComponent,
        FilterPipeRegionPipe,
        FilterPipeConsultantNamePipe,
        OrderPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
