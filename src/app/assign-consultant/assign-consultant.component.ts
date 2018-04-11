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
  selectedConsultantLanguage = {};
  selectedConsultantRoles: string[];

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

      let numMatches = 0;
      for (let i = 0; i < dataLength; i++) {
        let hasLanguage = false;
        const numLanguages = data[(i).toString()]['proficiencies'].length;
        for (let k = 0; k < numLanguages; k++) {
          if (data[(i).toString()]['proficiencies'][(k).toString()]['language'] === this.assignment['language']) {
            hasLanguage = true;
          }
        }
        if (data[(i).toString()]['translationRegion'] === this.assignment['translationRegion'] && hasLanguage) {
          numMatches++;
        }
      }

      let matchedConsultants = 0;
      this.consultants = new Array(numMatches);
      for (let i = 0; i < dataLength; i++) {
        let numRoles = 0;
        if (this.assignment['isAudioToAudioRole'] === true && data[(i).toString()]['isAudioToAudioRole'] === true) {
          numRoles++;
        }
        if (this.assignment['isGuestScholarRole'] === true && data[(i).toString()]['isGuestScholarRole'] === true) {
          numRoles++;
        }
        if (this.assignment['isLinguisticConsultantRole'] === true && data[(i).toString()]['isLinguisticConsultantRole'] === true) {
          numRoles++;
        }
        if (this.assignment['isManagerRole'] === true && data[(i).toString()]['isManagerRole'] === true) {
          numRoles++;
        }
        if (this.assignment['isStoryCheckerRole'] === true && data[(i).toString()]['isStoryCheckerRole'] === true) {
          numRoles++;
        }
        if (this.assignment['isTranslationConsultantInTrainingRole'] === true && data[(i).toString()]['isTranslationConsultantInTrainingRole'] === true) {
          numRoles++;
        }
        if (this.assignment['isTranslationConsultantRole'] === true && data[(i).toString()]['isTranslationConsultantRole'] === true) {
          numRoles++;
        }

        let hasLanguage = false;
        const numLanguages = data[(i).toString()]['proficiencies'].length;
        for (let k = 0; k < numLanguages; k++) {
          if (data[(i).toString()]['proficiencies'][(k).toString()]['language'] === this.assignment['language']) {
            hasLanguage = true;
          }
        }
        if (data[(i).toString()]['translationRegion'] === this.assignment['translationRegion'] && hasLanguage) {
          this.consultants[matchedConsultants] = data[i.toString()];
          matchedConsultants++;
        }
      }
      this.getConsultant(this.consultants[0]['_id']);
    });
  }

  getConsultant(id) {
    this.http.get('consultant/' + id).subscribe(data => {
      this.selectedConsultant = data;
      const numLanguages = data['proficiencies'].length;
      let i;
      for (i = 0; i < numLanguages; i++) {
        if (data['proficiencies'][(i).toString()]['language'] === this.assignment['language']) {
          this.selectedConsultantLanguage = data['proficiencies'][(i).toString()];
        }
      }

      this.selectedConsultantRoles = new Array(0)
      if (this.assignment['isAudioToAudioRole'] === true && data['isAudioToAudioRole'] === true) {
        this.selectedConsultantRoles.push('Audio to Audio Translation Consultant');
      }
      if (this.assignment['isGuestScholarRole'] === true && data['isGuestScholarRole'] === true) {
        this.selectedConsultantRoles.push('Guest Scholar (Exegetical, Linguistic, Bible)');
      }
      if (this.assignment['isLinguisticConsultantRole'] === true && data['isLinguisticConsultantRole'] === true) {
        this.selectedConsultantRoles.push('Linguistic Consultant');
      }
      if (this.assignment['isManagerRole'] === true && data['isManagerRole'] === true) {
        this.selectedConsultantRoles.push('Manager - Translation Consultant');
      }
      if (this.assignment['isStoryCheckerRole'] === true && data['isStoryCheckerRole'] === true) {
        this.selectedConsultantRoles.push('Story Checker');
      }
      if (this.assignment['isTranslationConsultantInTrainingRole'] === true && data['isTranslationConsultantInTrainingRole'] === true) {
        this.selectedConsultantRoles.push('Translation CiT');
      }
      if (this.assignment['isTranslationConsultantRole'] === true && data['isTranslationConsultantRole'] === true) {
        this.selectedConsultantRoles.push('Translation Consultant');
      }

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
