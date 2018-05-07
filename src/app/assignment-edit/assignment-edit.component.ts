/*
assignment-edit component loads details of an assignment from database.
On initialization, this file calls http GET to retrieve the assignment data.
On update, this file calls http PUT to send updated assignment data back to database and navigates back to assignments list.
*/

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssignmentEditComponent implements OnInit {

  assignment = {};
  isAssigned = false;

  constructor(private _location: Location, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  // On initialization, assignment data is pulled from database
  ngOnInit() {
    this.getAssignment(this.route.snapshot.params['id']);
  }

  // Retrieve assignment data from database
  getAssignment(id) {
    this.http.get('/assignment/' + id).subscribe(data => {
      this.assignment = data;
      if (data['consultantName']) {
        this.isAssigned = true;
      }
    });
  }

  // Remove consultant sets consultantId and consultant name back to values when unassigned
  removeConsultant() {
    this.assignment['consultantId'] = 'Unassigned';
    this.assignment['consultantName'] = '';
    this.isAssigned = false;
  }

  // Send changed data back to database to be stored
  updateAssignment(id) {
    this.http.put('/assignment/' + id, this.assignment)
      .subscribe(res => {
          this._location.back();
        }, (err) => {
          console.log(err);
        }
      );
  }
}
