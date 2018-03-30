/*
assignment-edit component loads details of an assignment from database.
On initialization, this file calls http GET to retrieve the assignment data.
On update, this file calls http PUT to send updated assignment data back to database and navigates back to assignments list.
*/

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssignmentEditComponent implements OnInit {

  assignment = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAssignment(this.route.snapshot.params['id']);
  }

  getAssignment(id) {
    this.http.get('/assignment/' + id).subscribe(data => {
      this.assignment = data;
    });
  }

  updateAssignment(id, consultantId) {
    this.http.put('/assignment/' + id, this.assignment)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/assignment/consultant/' + consultantId]);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
