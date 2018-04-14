/*
consultant-edit component loads details of a consultant from database.
On initialization, this file calls http GET to retrieve the consultant data.
On update, this file calls http PUT to send updated consultant data back to database and navigates back to consultants list.
*/

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LANGUAGES } from '../languages';
import { RANKING } from '../proficency-ranking';

@Component({
  selector: 'app-consultant-edit',
  templateUrl: './consultant-edit.component.html',
  styleUrls: ['./consultant-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConsultantEditComponent implements OnInit {

  languages = LANGUAGES;
  rankings = RANKING;

  consultant = {};

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {
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
        const id = res['_id'];
        this.router.navigate(['/consultants']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  pushLanguage(id, consultant) {
    this.http.patch('/consultant/' + id, this.consultant)
      .subscribe(res => {
        const id = res['_id'];
        this.router.navigate(['/consultant-edit/' + id]);
      }, (err) => {
        console.log(err);
      }
      );
  }

  removeProficiency(consultantId, proficiencyId) {
    this.http.delete('/consultant/' + consultantId + '/proficiencies/' + proficiencyId, this.consultant)
    .subscribe(res => {
      const id = res['_id'];
      this.router.navigate(['/consultant-edit/' + id]);
    }, (err) => {
      console.log(err);
    });
  }
}
