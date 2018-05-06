/*
assignment-create component loads some project details from the database,
and uses those details with new assignment details to create an assignment.
This code loads a new assignment's project information based on the project's key.
That information is displayed in assignment-create.component.html and the user can specify new assignment information there too.
When 'save' button is clicked in the html, 'createAssignment' function is called to insert new assignment data into the database.
*/

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-assignment-create',
  templateUrl: './assignment-create.component.html',
  styleUrls: ['./assignment-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssignmentCreateComponent implements OnInit {

  project = {};
  assignment = {};

  constructor(private _location: Location, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProject(this.route.snapshot.url[this.route.snapshot.url.length - 1]);
  }

  getProject(id) {
    this.http.get('/project/' + id).subscribe(data => {
      this.project = data;
      this.assignment['consultantId'] = 'Unassigned';
      this.assignment['projectId'] = data['_id'];
      this.assignment['projectName'] = data['projectName'];
      this.assignment['language'] = data['language'];
      this.assignment['translationRegion'] = data['translationRegion'];
    });
  }

  createAssignment(projectId, project) {
    this.http.post('assignment/project/' + projectId, this.assignment)
      .subscribe(res => {
        }, (err) => {
          console.log(err);
        }
      );
    this.router.navigate(['/projects']);
  }
}
