import { Component } from '@angular/core';

import { FilterPipeConsultantNamePipe } from './filter-pipe-consultantName/filter-pipe-consultantName.pipe';
import { FilterPipeRegionPipe } from './filter-pipe-region/filter-pipe-region.pipe';
import { FilterPipeAssignedPipe} from './filter-pipe-assigned/filter-pipe-assigned.pipe';

import { OrderPipe } from './order-pipe/ngx-order.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {
  }
}
