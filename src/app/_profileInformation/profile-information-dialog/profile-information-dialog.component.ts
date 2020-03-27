import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-profile-information-dialog',
  templateUrl: './profile-information-dialog.component.html',
  styleUrls: ['./profile-information-dialog.component.css']
})
export class ProfileInformationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProfileInformationDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
