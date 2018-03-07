import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultant-edit',
  templateUrl: './consultant-edit.component.html',
  styleUrls: ['./consultant-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConsultantEditComponent implements OnInit {

  consultant = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getConsultant(this.route.snapshot.params['id']);
  }

  getConsultant(id) {
    this.http.get('/consultant/' + id).subscribe(data => {
      this.consultant = data;
    });
  }

  updateConsultant(id, consultant) {
    this.http.put('/consultant/' + id, this.consultant)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/consultants']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
