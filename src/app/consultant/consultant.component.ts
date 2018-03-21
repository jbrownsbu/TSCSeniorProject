import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderPipe} from 'ngx-order-pipe';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {

  consultants: any;
  searchTermsName: string;
  searchTermsRegion: string;

  order: string = 'info.name';
  reverse: boolean = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/consultant').subscribe(data => {
      this.consultants = data;
    });
  }
}
