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

  // These variables are used by the getTopConsultantMatches method
  assignments: any;
  assignment = {};
  consultants: any[];
  scores: any[];

  // These variables are used by the getConsultant method
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

  // getAllAssignments loads all assignments as for part of getTopConsultantMatches algorithm
  getAllAssignments() {
    this.http.get('/assignment').subscribe(data => {
      this.assignments = data;
    });
  }

  // getAssignment loads data for a specific assignment using assignment's '_id' field
  getAssignment(id) {
    this.http.get('/assignment/' + id).subscribe(data => {
      this.assignment = data;
    });
  }

  // getTopConsultantMatches finds and ranks the best consultant matches for an assignment based on several consultant skills
  getTopConsultantMatches() {
    // Begin by getting all consultants from the database
    this.http.get('/consultant').subscribe(data => {
      const dataLength = data['length'];
      this.consultants = new Array(0); // Array storing consultant JSON objects
      this.scores = new Array(0); // Array storing scores corresponding to consultants

      // Add all consultants with correct language and region to array with scores of zero
      for (let i = 0; i < dataLength; i++) {
        // Check if consultant has the necessary language for the assignment
        let hasLanguage = false;
        const numLanguages = data[(i).toString()]['proficiencies'].length;
        for (let k = 0; k < numLanguages; k++) {
          if (data[(i).toString()]['proficiencies'][(k).toString()]['language'] === this.assignment['language']) {
            hasLanguage = true;
          }
        }
        // Check if consultant works within the necessary region for the assignment
        if ((data[(i).toString()]['translationRegion'] === this.assignment['translationRegion']) && hasLanguage) {
          this.consultants.push(data[(i).toString()]);
          this.scores.push(0);
        }
      }

      // Iterate through consultants in consultants array, calculate and assign score for each consultant
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
        // Identify specific language required by the assignment, and save it to 'language' variable
        let language;
        for (let j = 0; j < this.consultants[i]['proficiencies'].length; j++) {
          if (this.assignment['language'] === this.consultants[i]['proficiencies'][j]['language']) {
            language = this.consultants[i]['proficiencies'][j];
          }
        }
        // If assignment media is 'Written', weight 'reading' and 'writing' proficiencies
        if (this.assignment['media'] === 'Written') {
          this.scores[i] += (language['speaking'] + language['listening'] + 2 * language['reading'] + 2 * language['writing']);
        } else { // If not 'Written', weight 'speaking' and 'listening' proficiencies
          this.scores[i] += (2 * language['speaking'] + 2 * language['listening'] + language['reading'] + language['writing']);
        }

        // For each previous assignment this consultant has had on this project, add 3 points
        for (let j = 0; j < this.assignments['length']; j++) {
          if (this.assignments[j.toString()]['projectId'] === this.assignment['projectId'] &&
              this.assignments[j.toString()]['consultantId'] === this.consultants[i.toString()]['_id']) {
            this.scores[i] += 3;
          }
        }
      }
      // After consultants' scores have been calculated, sort the array from highest score to lowest
      this.mergeSort(this.scores, this.consultants, 0, this.scores.length - 1);

      // Automatically display top consultant's information
      this.getConsultant(this.consultants[0]['_id']);
    });
  }

  // mergeSort is called by getTopConsultantMatches to sort top consultants by their match score
  // scores and consultants arrays are passed in along with the left and right indexes of the portion of those arrays to be sorted
  mergeSort(arrScores, arrCons, leftEnd , rightEnd) {
    // If the length of the arrays passed in is greater than 1
    if (leftEnd < rightEnd) {
      // Calculate the middle position of the arrays
      const middle = Math.floor((leftEnd + rightEnd) / 2);
      // Pass first half and second half of arrays into recursive call of mergeSort
      this.mergeSort(arrScores, arrCons, leftEnd, middle);
      this.mergeSort(arrScores, arrCons, middle + 1, rightEnd);
      // After arrays are broken down to single elements, call merge to reassemble arrays in sorted order
      this.merge(arrScores, arrCons, leftEnd, middle, rightEnd);
    }
  }

  // merge is called by mergeSort to sort and reassemble broken down arrays
  // scores and consultants arrays are passed in along with the left, middle, and right indexes of the portion of those arrays to be sorted
  merge(arrScores, arrCons, leftEnd, middle, rightEnd) {
    // Instantiate loop control variables (lcv) for use in method
    let lcv1, lcv2, lcv3;

    // Calculate lengths of left and right portions of arrays to be merged
    const leftLength = middle - leftEnd + 1;
    const rightLength = rightEnd - middle;

    // Instantiate temporary arrays for sorting and merging partial arrays back together
    const arrLeftScores = new Array(leftLength);
    const arrLeftCons = new Array(leftLength);
    const arrRightScores = new Array(rightLength);
    const arrRightCons = new Array(rightLength);

    // Fill left and right temporary arrays with data from actual consultant and score arrays
    for (lcv1 = 0; lcv1 < leftLength; lcv1++) {
      arrLeftScores[lcv1] = arrScores[leftEnd + lcv1];
      arrLeftCons[lcv1] = arrCons[leftEnd + lcv1];
    }

    for (lcv2 = 0; lcv2 < rightLength; lcv2++) {
      arrRightScores[lcv2] = arrScores[middle + lcv2 + 1];
      arrRightCons[lcv2] = arrCons[middle + lcv2 + 1];
    }

    // Reassign values of lcv variables to zero
    lcv1 = 0;
    lcv2 = 0;
    lcv3 = 0;

    // Merge partial arrays by comparing elements from both arrays and storing them back in original consultants and scores arrays
    while (lcv1 < leftLength && lcv2 < rightLength) {
      if (arrLeftScores[lcv1] >= arrRightScores[lcv2]) {
        arrScores[lcv3] = arrLeftScores[lcv1];
        arrCons[lcv3] = arrLeftCons[lcv1];
        lcv1++;
      } else {
        arrScores[lcv3] = arrRightScores[lcv2];
        arrCons[lcv3] = arrRightCons[lcv2];
        lcv2++;
      }
      lcv3++;
    }

    // If not all elements were placed back in original consultants and scores arrays, place them in here
    while (lcv1 < leftLength) {
      arrCons[lcv3] = arrLeftCons[lcv1];
      arrScores[lcv3] = arrLeftScores[lcv1];
      lcv1++;
      lcv3++;
    }

    while (lcv2 < rightLength) {
      arrCons[lcv3] = arrRightCons[lcv2];
      arrScores[lcv3] = arrRightScores[lcv2];
      lcv2++;
      lcv3++;
    }
  }

  // getConsultant loads data for a specific consultant using consultant's '_id' field
  // after consultant is loaded, consultant's data is captured by class variables to be displayed in user interface
  getConsultant(id) {
    this.http.get('consultant/' + id).subscribe(data => {
      this.selectedConsultant = data;

      // Capture consultant language required by assignment
      const numLanguages = data['proficiencies'].length;
      let i;
      for (i = 0; i < numLanguages; i++) {
        if (data['proficiencies'][(i).toString()]['language'] === this.assignment['language']) {
          this.selectedConsultantLanguage = data['proficiencies'][(i).toString()];
        }
      }

      // Capture consultant roles required by assignment
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

      // Capture consultant testament required by assignment
      if (this.assignment['testament'] === 'Old Testament' && data['isOldTestament'] === true) {
        this.selectedConsultantTestament = 'Old Testament';
      } else if (this.assignment['testament'] === 'New Testament' && data['isNewTestament'] === true) {
        this.selectedConsultantTestament = 'New Testament';
      } else {
        this.selectedConsultantTestament = 'None';
      }

      // Capture consultant media required by assignment
      if (this.assignment['media'] === 'Written' && data['isWrittenMedia'] === true) {
        this.selectedConsultantMedia = 'Written';
      } else if (this.assignment['media'] === 'Audio' && data['isAudioMedia'] === true) {
        this.selectedConsultantMedia = 'Audio';
      } else if (this.assignment['media'] === 'Storytelling' && data['isStorytellingMedia'] === true) {
        this.selectedConsultantMedia = 'Storytelling';
      } else {
        this.selectedConsultantMedia = 'none';
      }

      // Capture consultant previous assignments on this assignment's project
      this.selectedConsultantAssignments = new Array(0);
      for (let j = 0; j < this.assignments['length']; j++) {
        if (this.assignments[j.toString()]['projectId'] === this.assignment['projectId'] &&
          this.assignments[j.toString()]['consultantId'] === data['_id']) {
          this.selectedConsultantAssignments.push(this.assignments[j.toString()]);
        }
      }

      // Set consultant being displayed as consultant assigned to assignment
      // When 'assign' button is clicked, this change is saved in the database
      this.assignment['consultantId'] = data['_id'];
      this.assignment['consultantName'] = data['firstName'] + ' ' + data['lastName'];
    });
  }

  // assignConsultant saves consultant whose information is currently displayed as the consultant assigned to this assignment
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
