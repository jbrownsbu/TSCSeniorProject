/*
consultant component loads list of consultants from database.
On initialization, this file calls http GET to retrieve the consultant data.
The list is filterable by name and region.
*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {

  consultants: any;

  // Variables for filtering by name or region
  searchTermsConsultantName: string;
  searchTermsRegion: string;

  // Consultants are automatically sorted by lastName, but can be sorted by any column
  order = 'lastName';
  reverse = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  constructor(private _location: Location, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  // On initialization, load all consultants from database
  ngOnInit() {
    this.http.get('/consultant').subscribe(data => {
      this.consultants = data;
    });
  }

  // Updating one consultant
  deleteConsultant(id, firstName, lastName) {
    const deleted = confirm('Are you sure that you want to delete ' + firstName + ' ' + lastName + '?');
    if (deleted) {
      this.http.delete('/consultant/' + id)
        .subscribe(res => {
            this.router.navigate(['/consultants']);
          }, (err) => {
            console.log(err);
          }
        );
    }// end if
  }
}
