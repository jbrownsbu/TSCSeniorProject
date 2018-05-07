/*
Assign-consultant component is used to calculate how well each consultant matches up with the skills required by a selected assignment.
This script loads the selected assignment's data, loads all consultant data, and then calculates a 'score' for how well each consultant
matches up to the assignment. The consultants are then sorted by their scores and the sorted consultants are sent to the view.
 */

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

  // Variable used by consultant name filter
  searchTermsConsultantName: string;

  // These variables are used by the getTopConsultantMatches method
  assignments: any;
  assignment = {};
  consultants = new Array(0);

  // These variables are used by the getConsultant method
  selectedConsultant = {};
  selectedConsultantLanguage = {};
  selectedConsultantRoles = new Array(0);
  selectedConsultantTestament: string;
  selectedConsultantMedia: string;
  selectedConsultantAssignments = new Array(0);

  // Clicking on a consultant row in the UI displays that consultant's data. These variable are used for that feature
  setClickedRow: Function;
  selectedRow: number;

  // Consultants are automatically sorted by score, but can be sorted by name as well
  order = 'score';
  reverse = true;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  constructor(private _location: Location, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    // This function is used by click consultant row feature
    this.setClickedRow = function(index) {
      this.selectedRow = index;
    };
  }

  ngOnInit() {
    // On initialization, load assignment and consultant data
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
      this.consultants = new Array(0); // Array storing consultant JSON objects

      // Add all consultants to array with scores of zero
      for (let i = 0; i < data['length']; i++) {
          this.consultants.push(data[(i).toString()]);
          this.consultants[i]['score'] = 0;
      }

      // Iterate through consultants array, calculating and assigning score for each consultant
      for (let i = 0; i < this.consultants.length; i++) {

        // Add 10 points to consultant's score if they work within the required region
        if (this.consultants[i]['translationRegion'] === this.assignment['translationRegion']) {
          this.consultants[i]['score'] = 10;
        }

        // Add point to consultant's score for each role they match
        if (this.assignment['isAudioToAudioRole'] === true &&
            this.consultants[i]['isAudioToAudioRole'] === true) {
          this.consultants[i]['score'] += 1;
        }
        if (this.assignment['isGuestScholarRole'] === true &&
            this.consultants[i]['isGuestScholarRole'] === true) {
          this.consultants[i]['score'] += 1;
        }
        if (this.assignment['isLinguisticConsultantRole'] === true &&
            this.consultants[i]['isLinguisticConsultantRole'] === true) {
          this.consultants[i]['score'] += 1;
        }
        if (this.assignment['isManagerRole'] === true &&
            this.consultants[i]['isManagerRole'] === true) {
          this.consultants[i]['score'] += 1;
        }
        if (this.assignment['isStoryCheckerRole'] === true &&
            this.consultants[i]['isStoryCheckerRole'] === true) {
          this.consultants[i]['score'] += 1;
        }
        if (this.assignment['isTranslationConsultantInTrainingRole'] === true &&
            this.consultants[i]['isTranslationConsultantInTrainingRole'] === true) {
          this.consultants[i]['score'] += 1;
        }
        if (this.assignment['isTranslationConsultantRole'] === true &&
            this.consultants[i]['isTranslationConsultantRole'] === true) {
          this.consultants[i]['score'] += 1;
        }

        // Add point to consultant's score if they match the testament
        if (this.assignment['testament'] === 'Old Testament' &&
            this.consultants[i]['isOldTestament'] === true) {
          this.consultants[i]['score'] += 1;
        }
        if (this.assignment['testament'] === 'New Testament' &&
            this.consultants[i]['isNewTestament'] === true) {
          this.consultants[i]['score'] += 1;
        }

        // Add 3 points to consultant's score if they match the media
        if (this.assignment['media'] === 'Written' &&
            this.consultants[i]['isWrittenMedia'] === true) {
          this.consultants[i]['score'] += 3;
        }
        if (this.assignment['media'] === 'Audio' &&
            this.consultants[i]['isAudioMedia'] === true) {
          this.consultants[i]['score'] += 3;
        }
        if (this.assignment['media'] === 'Storytelling' &&
            this.consultants[i]['isStorytellingMedia'] === true) {
          this.consultants[i]['score'] += 3;
        }

        // Add points to consultant's score, weighing different language proficiencies more than others depending on media
        // If consultant does not have language in their profile, do not add any points
        // Identify specific language required by the assignment, and save it to 'language' variable
        let language;
        let hasLanguage = false;
        for (let j = 0; j < this.consultants[i]['proficiencies'].length; j++) {
          if (this.assignment['language'] === this.consultants[i]['proficiencies'][j]['language']) {
            language = this.consultants[i]['proficiencies'][j];
            hasLanguage = true;
          }
        }
        // If assignment media is 'Written', weight 'reading' and 'writing' proficiencies
        // If assignment media is not 'Written', weight 'speaking' and 'listening' proficiencies
        if (hasLanguage) {
          if (this.assignment['media'] === 'Written') {
            this.consultants[i]['score'] += (language['speaking'] + language['listening'] + 2 * language['reading'] + 2 * language['writing']);
          } else {
            this.consultants[i]['score'] += (2 * language['speaking'] + 2 * language['listening'] + language['reading'] + language['writing']);
          }
        }

        // For each previous assignment this consultant has had on this project, add 3 points
        for (let j = 0; j < this.assignments['length']; j++) {
          if (this.assignments[j.toString()]['projectId'] === this.assignment['projectId'] &&
              this.assignments[j.toString()]['consultantId'] === this.consultants[i.toString()]['_id']) {
            this.consultants[i]['score'] += 3;
          }
        }
      }


      // After consultants' scores have been calculated, sort the array from highest score to lowest
      this.mergeSort(this.consultants, 0, this.consultants.length - 1);

      // Automatically display top consultant's information
      if (this.consultants.length > 0) {
        this.getConsultant(this.consultants[0]['_id']);
        this.selectedRow = 0;
      }
    });
  }

  // mergeSort is called by getTopConsultantMatches to sort top consultants by their match score
  // consultants array is passed in along with the left and right indexes of the portion of the array to be sorted
  mergeSort(arrCons, leftEnd , rightEnd) {
    // If the length of the array passed in is greater than 1
    if (leftEnd < rightEnd) {
      // Calculate the middle position of the array
      const middle = Math.floor((leftEnd + rightEnd) / 2);
      // Pass first half and second half of array into recursive call of mergeSort
      this.mergeSort(arrCons, leftEnd, middle);
      this.mergeSort(arrCons, middle + 1, rightEnd);
      // After array is broken down to single elements, call merge to reassemble array in sorted order
      this.merge(arrCons, leftEnd, middle, rightEnd);
    }
  }

  // merge is called by mergeSort to sort and reassemble broken down array
  // consultants array is passed in along with the left, middle, and right indexes of the portion of the array to be sorted
  merge(arrCons, leftEnd, middle, rightEnd) {
    // Instantiate loop control variables (lcv) for use in method
    let lcv1, lcv2, lcv3;

    // Calculate lengths of left and right portions of array to be merged
    const leftLength = middle - leftEnd + 1;
    const rightLength = rightEnd - middle;

    // Instantiate temporary arrays for sorting and merging partial arrays back together
    const arrLeftCons = new Array(leftLength);
    const arrRightCons = new Array(rightLength);

    // Fill left and right temporary arrays with data from actual consultants array
    for (lcv1 = 0; lcv1 < leftLength; lcv1++) {
      arrLeftCons[lcv1] = arrCons[leftEnd + lcv1];
    }

    for (lcv2 = 0; lcv2 < rightLength; lcv2++) {
      arrRightCons[lcv2] = arrCons[middle + lcv2 + 1];
    }

    // Reassign values of lcv variables to zero
    lcv1 = 0;
    lcv2 = 0;
    lcv3 = leftEnd;

    // Merge partial arrays by comparing elements from both arrays and storing them back in original consultants array
    while (lcv1 < leftLength && lcv2 < rightLength) {
      if (arrLeftCons[lcv1]['score'] >= arrRightCons[lcv2]['score']) {
        arrCons[lcv3] = arrLeftCons[lcv1];
        lcv1++;
      } else {
        arrCons[lcv3] = arrRightCons[lcv2];
        lcv2++;
      }
      lcv3++;
    }

    // If not all elements were placed back in original consultants array, place them in here
    while (lcv1 < leftLength) {
      arrCons[lcv3] = arrLeftCons[lcv1];
      lcv1++;
      lcv3++;
    }

    while (lcv2 < rightLength) {
      arrCons[lcv3] = arrRightCons[lcv2];
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
      let hasLanguage = false;
      let i;
      for (i = 0; i < numLanguages; i++) {
        if (data['proficiencies'][(i).toString()]['language'] === this.assignment['language']) {
          this.selectedConsultantLanguage = data['proficiencies'][(i).toString()];
          hasLanguage = true;
        }
      }
      if (!hasLanguage) {
        this.selectedConsultantLanguage['language'] = 'none';
        this.selectedConsultantLanguage['reading'] = '';
        this.selectedConsultantLanguage['writing'] = '';
        this.selectedConsultantLanguage['speaking'] = '';
        this.selectedConsultantLanguage['listening'] = '';
      }

      // Capture consultant roles required by assignment
      // If role is required by assignment, but not met by consultant, add an empty string for UI consistency
      this.selectedConsultantRoles = new Array(0);
      if (this.assignment['isAudioToAudioRole'] === true && data['isAudioToAudioRole'] === true) {
        this.selectedConsultantRoles.push('Audio to Audio Translation Consultant');
      } else if (this.assignment['isAudioToAudioRole'] === true) {
        this.selectedConsultantRoles.push('');
      }
      if (this.assignment['isGuestScholarRole'] === true && data['isGuestScholarRole'] === true) {
        this.selectedConsultantRoles.push('Guest Scholar (Exegetical, Linguistic, Bible)');
      } else if (this.assignment['isGuestScholarRole'] === true) {
        this.selectedConsultantRoles.push('');
      }
      if (this.assignment['isLinguisticConsultantRole'] === true && data['isLinguisticConsultantRole'] === true) {
        this.selectedConsultantRoles.push('Linguistic Consultant');
      } else if (this.assignment['isLinguisticConsultantRole'] === true) {
        this.selectedConsultantRoles.push('');
      }
      if (this.assignment['isManagerRole'] === true && data['isManagerRole'] === true) {
        this.selectedConsultantRoles.push('Manager - Translation Consultant');
      } else if (this.assignment['isManagerRole'] === true) {
        this.selectedConsultantRoles.push('');
      }
      if (this.assignment['isStoryCheckerRole'] === true && data['isStoryCheckerRole'] === true) {
        this.selectedConsultantRoles.push('Story Checker');
      } else if (this.assignment['isStoryCheckerRole'] === true) {
        this.selectedConsultantRoles.push('');
      }
      if (this.assignment['isTranslationConsultantInTrainingRole'] === true && data['isTranslationConsultantInTrainingRole'] === true) {
        this.selectedConsultantRoles.push('Translation CiT');
      } else if (this.assignment['isTranslationConsultantInTrainingRole'] === true) {
        this.selectedConsultantRoles.push('');
      }
      if (this.assignment['isTranslationConsultantRole'] === true && data['isTranslationConsultantRole'] === true) {
        this.selectedConsultantRoles.push('Translation Consultant');
      } else if (this.assignment['isTranslationConsultantRole'] === true) {
        this.selectedConsultantRoles.push('');
      }

      // Capture consultant testament required by assignment
      if (this.assignment['testament'] === 'Old Testament' && data['isOldTestament'] === true) {
        this.selectedConsultantTestament = 'Old Testament';
      } else if (this.assignment['testament'] === 'New Testament' && data['isNewTestament'] === true) {
        this.selectedConsultantTestament = 'New Testament';
      } else {
        this.selectedConsultantTestament = 'none';
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
    });
  }

  // assignConsultant saves consultant whose assign button is clicked as the consultant assigned to this assignment
  assignConsultant(assignmentId, consultantId, consultantName) {
    this.assignment['consultantId'] = consultantId;
    this.assignment['consultantName'] = consultantName;
    this.http.put('/assignment/' + assignmentId, this.assignment)
      .subscribe(res => {
          this._location.back();
        }, (err) => {
          console.log(err);
        }
      );
  }
}
