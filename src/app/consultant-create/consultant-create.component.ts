/*
consultant-create component generates an empty form to create new consultant in the database.
On update, this file calls http PUT to send updated consultant data back to database and navigates back to consultants list.
*/

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

  // On initialization, currentLanguage is set to display top option in each select list
  ngOnInit() {
    this.consultant['proficiencies'] = new Array;
    this.currentLanguage['language'] = 'Language';
    this.currentLanguage['speaking'] = 'Speaking';
    this.currentLanguage['listening'] = 'Listening';
    this.currentLanguage['reading'] = 'Reading';
    this.currentLanguage['writing'] = 'Writing';
  }

  // Send form data to database to create new consultant
  createConsultant() {
    this.http.post('consultant/create', this.consultant)
      .subscribe( res => {
      }, (err) => {
        console.log(err);
      }
    );
    this.router.navigate( ['/consultants']);
  }

  // Check if a consultant's proficiencies array already contains a specified language
  // If true, return index of language, if false, return -1
  hasLanguage(lang) {
    let index = -1;
    let i;
    for (i = 0; i < this.consultant['proficiencies'].length; i++) {
      if ((this.consultant['proficiencies'][i.toString()]['language']) === lang['language']) {
        index = i;
      }
    }

    return index;
  }

  // Add language to consultant's proficiencies array
  // If language is already in consultant's proficiencies array, update skills values
  addLanguage(newLanguage) {
    const index = this.hasLanguage(newLanguage);
    if (index >= 0) {
      this.consultant['proficiencies'][index]['speaking'] = newLanguage['speaking'];
      this.consultant['proficiencies'][index]['listening'] = newLanguage['listening'];
      this.consultant['proficiencies'][index]['writing'] = newLanguage['writing'];
      this.consultant['proficiencies'][index]['reading'] = newLanguage['reading'];
    } else {
      const lang = {};
      lang['language'] = newLanguage['language'];
      lang['speaking'] = newLanguage['speaking'];
      lang['listening'] = newLanguage['listening'];
      lang['writing'] = newLanguage['writing'];
      lang['reading'] = newLanguage['reading'];
      this.consultant['proficiencies'].push(lang);
    }
  }

  // Remove language from consultant's proficiencies array
  removeLanguage(lang) {
    let i;
    for (i = 0; i < this.consultant['proficiencies'].length; i++) {
      if ((this.consultant['proficiencies'][i.toString()]['language']) === lang) {
        this.consultant['proficiencies'].splice(i, 1);
      }
    }
  }
}
