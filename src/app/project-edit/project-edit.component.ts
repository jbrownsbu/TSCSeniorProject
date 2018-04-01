/*
project-edit component loads details of a project from database.
On initialization, this file calls http GET to retrieve the project data.
On update, this file calls http PUT to send updated project data back to database and navigates back to projects list.
*/

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectEditComponent implements OnInit {

  project = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProject(this.route.snapshot.params['id']);
  }

  getProject(id) {
    this.http.get('/project/' + id).subscribe(data => {
      this.project = data;
    });
  }

  updateProject(id) {
    this.http.put('/project/' + id, this.project)
      .subscribe(res => {
        }, (err) => {
          console.log(err);
        }
      );
    this.router.navigate(['/projects']);
  }
}
