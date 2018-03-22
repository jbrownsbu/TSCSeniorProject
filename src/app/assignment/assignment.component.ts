import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  assignments: any;
  searchTerms: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/assignment').subscribe(data => {
      this.assignments = data;
    });
  }

}
