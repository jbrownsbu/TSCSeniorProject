/*
Assignment component loads list of assignments from database for a specific consultant.
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

  // UI differs depending on how Assignments is accessed, for specific consultant, specific project, or all assignments
  isConsultantView: boolean;
  consultantName: string;
  isProjectView: boolean;
  projectName: string;
  isAllView: boolean;

  // Variable for the value of the unassigned only filter.
  searchTermsAssigned: boolean;

  // Assignments are automatically sorted by startDate, but can be sorted by name as well
  order = 'startDate';
  reverse = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  // On initialization, consultant, project, or all view is determined, and appropriate data is retrieved to be displayed
  // Only on 'all' view, unassigned filter is set to 'true'
  ngOnInit() {
    if (this.route.snapshot.url.length > 2) {
      if (this.route.snapshot.url[this.route.snapshot.url.length - 2].toString() === 'consultant') {
        this.isConsultantView = true;
        this.searchTermsAssigned = false;
        this.getConsultantNameByConsultantId(this.route.snapshot.params['consultantId']);
        this.getAssignmentsByConsultantId(this.route.snapshot.params['consultantId']);
      } else if (this.route.snapshot.url[this.route.snapshot.url.length - 2].toString() === 'project') {
        this.isProjectView = true;
        this.searchTermsAssigned = false;
        this.getProjectNameByProjectId(this.route.snapshot.params['projectId']);
        this.getAssignmentsByProjectId(this.route.snapshot.params['projectId']);
      }
    } else {
      this.isAllView = true;
      this.searchTermsAssigned = true;
      this.getAllAssignments();
    }
  }

  // For consultant view, get all assignments for that consultant
  getAssignmentsByConsultantId(consultantId) {
    this.http.get('/assignment/consultant/' + consultantId).subscribe(data => {
      this.assignments = data;
    });
  }

  // For consultant view, get consultant's name
  getConsultantNameByConsultantId(consultantId) {
    this.http.get('/consultant/' + consultantId).subscribe(data => {
      this.consultantName = data['firstName'] + ' ' + data['lastName'];
    });
  }

  // For project view, get all assignments for that project
  getAssignmentsByProjectId(projectId) {
    this.http.get('/assignment/project/' + projectId).subscribe(data => {
      this.assignments = data;
    });
  }

  // For project view, get project's name
  getProjectNameByProjectId(projectId) {
    this.http.get('/project/' + projectId).subscribe(data => {
      this.projectName = data['projectName'];
    });
  }

  // For all view, get all assignments
  getAllAssignments() {
    this.http.get('/assignment').subscribe(data => {
      this.assignments = data;
    });
  }

}
