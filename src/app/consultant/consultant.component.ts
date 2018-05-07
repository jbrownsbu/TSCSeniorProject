/*
consultant component loads list of consultants from database.
On initialization, this file calls http GET to retrieve the consultant data.
The list is filterable by name and region.
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

  // Variables for filtering by name or region
  searchTermsConsultantName: string;
  searchTermsRegion: string;

  // Consultants are automatically sorted by lastName, but can be sorted by any column
  order = 'lastName';
  reverse = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  constructor(private http: HttpClient) {}

  // On initialization, load all consultants from database
  ngOnInit() {
    this.http.get('/consultant').subscribe(data => {
      this.consultants = data;
    });
  }
}
