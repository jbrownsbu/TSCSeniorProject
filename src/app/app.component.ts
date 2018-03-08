import { Component } from '@angular/core';

import { OrderPipe } from './order-pipe/ngx-order.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // @param {OrderPipe} orderPipe

  constructor(private orderPipe: OrderPipe) {
    // console.log(this.orderPipe.transform(this.collection, this.order));
  }
}
