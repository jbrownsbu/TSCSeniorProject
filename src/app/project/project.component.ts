/*
project component loads list of projects from database.
On initialization, this file calls http GET to retrieve the project data.
*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any; // Holds project data after retrieved from database.
  searchTermsProjectName: string;
  searchTermsRegion: string;
  searchTermsLanguage: string;

  order = 'projectName';
  reverse = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/project').subscribe(data => {
      this.projects = data;
    });
  }
}
