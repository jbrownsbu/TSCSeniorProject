import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultant-detail',
  templateUrl: './consultant-detail.component.html',
  styleUrls: ['./consultant-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConsultantDetailComponent implements OnInit {

  consultant = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getConsultantDetail(this.route.snapshot.params['id']);
  }

  getConsultantDetail(id) {
    this.http.get('/consultant/' + id).subscribe(data => {
      this.consultant = data;
    });
  }

  // addRowtoTable() {
  //   var table = document.getElementById('languageTable');
  //   var row = table.insertRow(table.);
  // }
}
