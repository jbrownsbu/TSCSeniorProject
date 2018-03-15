import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {getCollection} from '@angular/cli/utilities/schematics';

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
          const id = res['_id'];
          this.router.navigate(['/consultants']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  addLanguageRow() {
    const tableRef = document.getElementById('languageTable') as HTMLTableElement;
    console.log(tableRef);
    const newRow = tableRef.insertRow();
    console.log('Hello!');
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.innerHTML = 'Hello';
    cell2.innerHTML = 'there';
    cell3.innerHTML = 'General Kenobi';
  }
}
