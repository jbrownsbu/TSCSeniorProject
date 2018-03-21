import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {getCollection} from '@angular/cli/utilities/schematics';

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

  updateAssignment(id, assignment) {
    this.http.put('/assignment/' + id, this.assignment)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/assignments']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
