import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import {Deactivation2Component} from '../deactivation2/deactivation2.component';
@Component({
  selector: 'app-deactivation1',
  templateUrl: './deactivation1.component.html',
  styleUrls: ['./deactivation1.component.css']
})
export class Deactivation1Component implements OnInit {
  requestsList: string[] = ['Mona']; // static test data

  constructor(public dialogRef: MatDialogRef<Deactivation1Component>,
    private matDialog: MatDialog,) { }

  ngOnInit(): void {
  }

  cancelButton() {
    this.dialogRef.close();
  }

  submitButton() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { name: "Mona" }; // static data to be changed 
    this.matDialog.open(Deactivation2Component, dialogConfig);
  }

}
