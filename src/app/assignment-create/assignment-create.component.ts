import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assignment-create',
  templateUrl: './assignment-create.component.html',
  styleUrls: ['./assignment-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssignmentCreateComponent implements OnInit {

  project = {};
  assignment = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProject(this.route.snapshot.url[this.route.snapshot.url.length - 1]);
  }

  getProject(id) {
    this.http.get('/project/' + id).subscribe(data => {
      this.project = data;
    });
  }

  createAssignment(projectId) {
    this.http.post('assignment/project/' + projectId, this.assignment)
      .subscribe(res => {
        }, (err) => {
          console.log(err);
        }
      );
    this.router.navigate(['/projects']);
  }
}
