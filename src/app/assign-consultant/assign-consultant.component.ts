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

  assignments: any;
  assignment = {};
  consultants: any[];
  scores: any[];
  selectedConsultant = {};
  selectedConsultantLanguage = {};
  selectedConsultantRoles: string[];
  selectedConsultantTestament: string;
  selectedConsultantMedia: string;
  selectedConsultantAssignments: any[];

  constructor(private _location: Location, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllAssignments();
    this.getAssignment(this.route.snapshot.params['assignmentId']);
    this.getTopConsultantMatches();
  }

  getAllAssignments() {
    this.http.get('/assignment').subscribe(data => {
      this.assignments = data;
    });
  }

  getAssignment(id) {
    this.http.get('/assignment/' + id).subscribe(data => {
      this.assignment = data;
    });
  }

  getTopConsultantMatches() {
    this.http.get('/consultant').subscribe(data => {
      const dataLength = data['length'];
      this.consultants = new Array(0); // Array storing consultant JSON objects
      this.scores = new Array(0); // Array storing scores corresponding to consultants

      // Add all consultants with correct language and region to array with scores of zero
      for (let i = 0; i < dataLength; i++) {
        let hasLanguage = false;
        const numLanguages = data[(i).toString()]['proficiencies'].length;
        for (let k = 0; k < numLanguages; k++) {
          if (data[(i).toString()]['proficiencies'][(k).toString()]['language'] === this.assignment['language']) {
            hasLanguage = true;
          }
        }
        if ((data[(i).toString()]['translationRegion'] === this.assignment['translationRegion']) && hasLanguage) {
          this.consultants.push(data[(i).toString()]);
          this.scores.push(0);
        }
      }

      // Iterate through consultants, calculate and assign score for each consultant
      for (let i = 0; i < this.consultants.length; i++) {

        // Add point to consultant's score for each role they match
        if (this.assignment['isAudioToAudioRole'] === true &&
            this.consultants[i]['isAudioToAudioRole'] === true) {
          this.scores[i] += 1;
        }
        if (this.assignment['isGuestScholarRole'] === true &&
            this.consultants[i]['isGuestScholarRole'] === true) {
          this.scores[i] += 1;
        }
        if (this.assignment['isLinguisticConsultantRole'] === true &&
            this.consultants[i]['isLinguisticConsultantRole'] === true) {
          this.scores[i] += 1;
        }
        if (this.assignment['isManagerRole'] === true &&
            this.consultants[i]['isManagerRole'] === true) {
          this.scores[i] += 1;
        }
        if (this.assignment['isStoryCheckerRole'] === true &&
            this.consultants[i]['isStoryCheckerRole'] === true) {
          this.scores[i] += 1;
        }
        if (this.assignment['isTranslationConsultantInTrainingRole'] === true &&
            this.consultants[i]['isTranslationConsultantInTrainingRole'] === true) {
          this.scores[i] += 1;
        }
        if (this.assignment['isTranslationConsultantRole'] === true &&
            this.consultants[i]['isTranslationConsultantRole'] === true) {
          this.scores[i] += 1;
        }

        // Add point to consultant's score if they match the testament
        if (this.assignment['testament'] === 'Old Testament' &&
            this.consultants[i]['isOldTestament'] === true) {
          this.scores[i] += 1;
        }
        if (this.assignment['testament'] === 'New Testament' &&
            this.consultants[i]['isNewTestament'] === true) {
          this.scores[i] += 1;
        }

        // Add 3 points to consultant's score if they match the media
        if (this.assignment['media'] === 'Written' &&
            this.consultants[i]['isWrittenMedia'] === true) {
          this.scores[i] += 3;
        }
        if (this.assignment['media'] === 'Audio' &&
            this.consultants[i]['isAudioMedia'] === true) {
          this.scores[i] += 3;
        }
        if (this.assignment['media'] === 'Storytelling' &&
            this.consultants[i]['isStorytellingMedia'] === true) {
          this.scores[i] += 3;
        }

        // Add points to consultant's score, weighing different language proficiencies more than others depending on media
        let language;
        for (let j = 0; j < this.consultants[i]['proficiencies'].length; j++) {
          if (this.assignment['language'] === this.consultants[i]['proficiencies'][j]['language']) {
            language = this.consultants[i]['proficiencies'][j];
          }
        }
        if (this.assignment['media'] === 'Written') {
          this.scores[i] += (language['speaking'] + language['listening'] + 2 * language['reading'] + 2 * language['writing']);
        } else {
          this.scores[i] += (2 * language['speaking'] + 2 * language['listening'] + language['reading'] + language['writing']);
        }

        // For each previous assignment this consultant has had on this project, add 3 points
        for (let j = 0; j < this.assignments['length']; j++) {
          if (this.assignments[j.toString()]['projectId'] === this.assignment['projectId'] &&
              this.assignments[j.toString()]['consultantId'] === this.consultants[i.toString()]['_id']) {
            this.scores[i] += 3;
          }
        }

        console.log('consultant ' + this.consultants[i.toString()]['firstName'] + ' score: ' + this.scores[i]);
      }
      console.log('scoresLengthBefore: ' + this.scores[0]);
      console.log('consLengthBefore: ' + this.consultants[0]);
      this.mergeSort(this.scores, this.consultants, 0, this.scores.length - 1);
      console.log('scoresLengthAfter: ' + this.scores[0]);
      console.log('consLengthAfter: ' + this.consultants[0]);

      this.getConsultant(this.consultants[0]['_id']);
    });
  }

  mergeSort(arrScores, arrCons, l , r) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      console.log('merge l: ' + l + ' r: ' + r + ' m: ' + m);
      this.mergeSort(arrScores, arrCons, l, m);
      this.mergeSort(arrScores, arrCons, m + 1, r);
      this.merge(arrScores, arrCons, l, m, r);
    }
  }

  merge(arrScores, arrCons, l, m, r) {
    let i, j, k;
    const nOne = m - l + 1;
    const nTwo = r - m;

    const arrLeftScores = new Array(nOne);
    const arrLeftCons = new Array(nOne);
    const arrRightScores = new Array(nTwo);
    const arrRightCons = new Array(nTwo);

    for (i = 0; i < nOne; i++) {
      arrLeftScores[i] = arrScores[l + i];
      arrLeftCons[i] = arrCons[l + i];
    }

    for (j = 0; j < nTwo; j++) {
      arrRightScores[j] = arrScores[m + j + 1];
      arrRightCons[j] = arrCons[m + j + 1];
    }

    i = 0;
    j = 0;
    k = 0;

    while (i < nOne && j < nTwo) {
      if (arrLeftScores[i] >= arrRightScores[j]) {
        arrScores[k] = arrLeftScores[i];
        arrCons[k] = arrLeftCons[i];
        i++;
      } else {
        arrScores[k] = arrRightScores[j];
        arrCons[k] = arrRightCons[j];
        j++;
      }
      k++;
    }

    while (i < nOne) {
      arrCons[k] = arrLeftCons[i];
      arrScores[k] = arrLeftScores[i];
      i++;
      k++;
    }

    while (j < nTwo) {
      arrCons[k] = arrRightCons[j];
      arrScores[k] = arrRightScores[j];
      j++;
      k++;
    }
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

      this.selectedConsultantRoles = new Array(0);
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
      if (this.selectedConsultantRoles.length === 0) {
        this.selectedConsultantRoles.push('none');
      }

      if (this.assignment['testament'] === 'Old Testament' && data['isOldTestament'] === true) {
        this.selectedConsultantTestament = 'Old Testament';
      } else if (this.assignment['testament'] === 'New Testament' && data['isNewTestament'] === true) {
        this.selectedConsultantTestament = 'New Testament';
      } else {
        this.selectedConsultantTestament = 'None';
      }

      if (this.assignment['media'] === 'Written' && data['isWrittenMedia'] === true) {
        this.selectedConsultantMedia = 'Written';
      } else if (this.assignment['media'] === 'Audio' && data['isAudioMedia'] === true) {
        this.selectedConsultantMedia = 'Audio';
      } else if (this.assignment['media'] === 'Storytelling' && data['isStorytellingMedia'] === true) {
        this.selectedConsultantMedia = 'Storytelling';
      } else {
        this.selectedConsultantMedia = 'none';
      }

      this.selectedConsultantAssignments = new Array(0);
      for (let j = 0; j < this.assignments['length']; j++) {
        if (this.assignments[j.toString()]['projectId'] === this.assignment['projectId'] &&
          this.assignments[j.toString()]['consultantId'] === data['_id']) {
          this.selectedConsultantAssignments.push(this.assignments[j.toString()]);
        }
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
