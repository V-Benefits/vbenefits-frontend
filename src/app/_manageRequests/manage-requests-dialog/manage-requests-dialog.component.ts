import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-requests-dialog',
  templateUrl: './manage-requests-dialog.component.html',
  styleUrls: ['./manage-requests-dialog.component.css']
})
export class ManageRequestsDialogComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {

  }

}
