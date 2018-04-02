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
    if (this.route.snapshot.url.length > 2) {
      if (this.route.snapshot.url[this.route.snapshot.url.length - 2].toString() === 'consultant') {
        this.getAssignmentsByConsultantId(this.route.snapshot.params['consultantId']);
      } else if (this.route.snapshot.url[this.route.snapshot.url.length - 2].toString() === 'project') {
        this.getAssignmentsByProjectId(this.route.snapshot.params['projectId']);
      }
    } else {
      this.getAllAssignments();
    }
  }

  getAssignmentsByConsultantId(consultantId) {
    this.http.get('/assignment/consultant/' + consultantId).subscribe(data => {
      this.assignments = data;
    });
  }

  getAssignmentsByProjectId(projectId) {
    this.http.get('/assignment/project/' + projectId).subscribe(data => {
      this.assignments = data;
    });
  }

  getAllAssignments() {
    this.http.get('/assignment').subscribe(data => {
      this.assignments = data;
    });
  }
}
