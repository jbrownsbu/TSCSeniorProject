/*
consultant component loads list of consultants from database.
On initialization, this file calls http GET to retrieve the consultant data.
The list is filterable by name and region.
The list is orderable by last name and region.
*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {

  consultants: any;
  searchTermsConsultantName: string;
  searchTermsRegion: string;

  order = 'lastName';
  reverse = false;
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
