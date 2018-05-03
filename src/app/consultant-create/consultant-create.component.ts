

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultant-create',
  templateUrl: './consultant-create.component.html',
  styleUrls: ['./consultant-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConsultantCreateComponent implements OnInit {

  consultant = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  createConsultant() {
    this.http.post('consultant/create', this.consultant)
      .subscribe( res => {
      }, (err) => {
        console.log(err);
      }
    );
    this.router.navigate( ['/consultants']);
  }
}
