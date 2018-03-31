/*
assignment component loads list of assignments from database for a specific consultant.
On initialization, this file calls http GET to retrieve the assignment data.
*/

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssignmentComponent implements OnInit {

  assignments: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAssignmentsByConsultantId(this.route.snapshot.params['consultantId']);
  }

  getAssignmentsByConsultantId(consultantId) {
    this.http.get('/assignment/consultant/' + consultantId).subscribe(data => {
      this.assignments = data;
    });
  }

}
