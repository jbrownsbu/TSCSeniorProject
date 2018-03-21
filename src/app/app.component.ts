import { Component } from '@angular/core';

import { FilterPipeNamePipe } from './filter-pipe-name/filter-pipe-name.pipe';
import { FilterPipeRegionPipe } from './filter-pipe-region/filter-pipe-region.pipe';

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
