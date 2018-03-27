import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {getCollection} from '@angular/cli/utilities/schematics';

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
          const id = res['_id'];
          this.router.navigate(['/projects']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
