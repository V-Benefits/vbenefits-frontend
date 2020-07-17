import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sim-card-request-edit-dialog',
  templateUrl: './sim-card-request-edit-dialog.component.html',
  styleUrls: ['./sim-card-request-edit-dialog.component.css']
})
export class SimCardRequestEditDialogComponent implements OnInit {

  requestForList: string[] = ['Myself', 'Family'];
  requestTypeList: string[] = ['newLine'];
  RatePlanTypeList: string[] = ['Red 300 (default)'];

  constructor() { }

  ngOnInit(): void {
  }

}
