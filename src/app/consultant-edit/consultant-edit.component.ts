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
import { Location } from '@angular/common';

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
  currentLanguage = {};

  constructor(private _location: Location,
              private http: HttpClient,
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
    this.currentLanguage['language'] = 'Amharic';
    this.currentLanguage['speaking'] = 1;
    this.currentLanguage['listening'] = 1;
    this.currentLanguage['reading'] = 1;
    this.currentLanguage['writing'] = 1;
  }

  // Getting one consultant by Id
  getConsultant(id) {
    this.http.get('/consultant/' + id).subscribe(data => {
      this.consultant = data;
    });
  }

  // Updating one consultant
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

  // Pushing a language to Consultant proficiency list
  /* Currently not in use
  pushLanguage(id, consultant) {
    this.http.patch('/consultant/' + id, this.consultant)
      .subscribe(res => {
        const id = res['_id'];
        this.router.navigate(['/consultant-edit/' + id]);
      }, (err) => {
        console.log(err);
      }
      );
  }*/

  addLanguage(newLanguage) {
    let isNew = true;
    let i;
    for (i = 0; i < this.consultant['proficiencies'].length; i++) {
      if ((this.consultant['proficiencies'][i.toString()]['language']) === newLanguage['language']) {
        isNew = false;
        this.consultant['proficiencies'][i.toString()]['speaking'] = newLanguage['speaking'];
        this.consultant['proficiencies'][i.toString()]['listening'] = newLanguage['listening'];
        this.consultant['proficiencies'][i.toString()]['writing'] = newLanguage['writing'];
        this.consultant['proficiencies'][i.toString()]['reading'] = newLanguage['reading'];
      }
    }
    if (isNew) {
      const lang = {};
      lang['language'] = newLanguage['language'];
      lang['speaking'] = newLanguage['speaking'];
      lang['listening'] = newLanguage['listening'];
      lang['writing'] = newLanguage['writing'];
      lang['reading'] = newLanguage['reading'];
      this.consultant['proficiencies'].push(lang);
    }
  }

  removeLanguage(lang) {
    let i;
    for (i = 0; i < this.consultant['proficiencies'].length; i++) {
      if ((this.consultant['proficiencies'][i.toString()]['language']) === lang) {
        this.consultant['proficiencies'].splice(i, 1);
      }
    }
  }
}
