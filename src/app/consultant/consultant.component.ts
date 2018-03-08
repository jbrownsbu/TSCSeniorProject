import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {

  consultants: any;
  searchTerms: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/consultant').subscribe(data => {
      this.consultants = data;
    });
  }
}
