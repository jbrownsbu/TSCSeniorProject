import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-assign-consultant',
  templateUrl: './assign-consultant.component.html',
  styleUrls: ['./assign-consultant.component.css']
})
export class AssignConsultantComponent implements OnInit {

  assignment = {};
  consultants: any[];
  selectedConsultant = {};

  constructor(private _location: Location, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAssignment(this.route.snapshot.params['assignmentId']);
    this.getTopConsultantMatches();
  }

  getAssignment(id) {
    this.http.get('/assignment/' + id).subscribe(data => {
      this.assignment = data;
    });
  }

  getTopConsultantMatches() {
    this.http.get('/consultant').subscribe(data => {
      const dataLength = data['length'];

      let arrayLength = 0;
      let i;
      for ( i = 0; i < dataLength; i++) {
        if (data[(i).toString()]['translationRegion'] === this.assignment['translationRegion']) {
          arrayLength++;
        }
      }

      let j = 0;

      this.consultants = new Array(arrayLength);
      for ( i = 0; i < dataLength; i++) {
        if (data[(i).toString()]['translationRegion'] === this.assignment['translationRegion']) {
          this.consultants[j] = data[i.toString()];
          j++;
        }
      }
    });
  }

  getConsultant(id) {
    this.http.get('consultant/' + id).subscribe(data => {
      this.selectedConsultant = data;
      this.assignment['consultantId'] = data['_id'];
      this.assignment['consultantName'] = data['firstName'] + ' ' + data['lastName'];
    });
  }

  assignConsultant(assignmentId) {
    this.http.put('/assignment/' + assignmentId, this.assignment)
      .subscribe(res => {
          this._location.back();
        }, (err) => {
          console.log(err);
        }
      );
  }

}
