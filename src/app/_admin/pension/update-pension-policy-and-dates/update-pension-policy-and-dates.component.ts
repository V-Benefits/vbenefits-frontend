import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-update-pension-policy-and-dates',
  templateUrl: './update-pension-policy-and-dates.component.html',
  styleUrls: ['./update-pension-policy-and-dates.component.css']
})
export class UpdatePensionPolicyAndDatesComponent implements OnInit {

  name = 'Angular';
  public start: Date = new Date("10/07/2017");
  public end: Date = new Date("11/25/2017");
  constructor() { }

  ngOnInit(): void {
  }

  getDater(data) {
    console.log(data);
  }

}
