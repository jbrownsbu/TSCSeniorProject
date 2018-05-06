

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LANGUAGES } from '../languages';
import { RANKING } from '../proficency-ranking';
import { Location } from '@angular/common';

@Component({
  selector: 'app-consultant-create',
  templateUrl: './consultant-create.component.html',
  styleUrls: ['./consultant-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConsultantCreateComponent implements OnInit {

  languages = LANGUAGES;
  rankings = RANKING;

  consultant = {};
  currentLanguage = {};

  constructor(private _location: Location, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.consultant['proficiencies'] = new Array;
    this.currentLanguage['language'] = 'Amharic';
    this.currentLanguage['speaking'] = 1;
    this.currentLanguage['listening'] = 1;
    this.currentLanguage['reading'] = 1;
    this.currentLanguage['writing'] = 1;
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

  addLanguage(newLanguage) {
    console.log('in add');
      const lang = {};
      lang['language'] = newLanguage['language'];
      lang['speaking'] = newLanguage['speaking'];
      lang['listening'] = newLanguage['listening'];
      lang['writing'] = newLanguage['writing'];
      lang['reading'] = newLanguage['reading'];
      this.consultant['proficiencies'].push(lang);
      console.log('lang: ' + this.consultant['proficiencies']['0']['language']);
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
