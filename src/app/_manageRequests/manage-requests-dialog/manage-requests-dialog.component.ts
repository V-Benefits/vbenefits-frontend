import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { ProfileInformationDialogComponent } from '../../_profileInformation/profile-information-dialog/profile-information-dialog.component';

@Component({
  selector: 'app-manage-requests-dialog',
  templateUrl: './manage-requests-dialog.component.html',
  styleUrls: ['./manage-requests-dialog.component.css']
})
export class ManageRequestsDialogComponent implements OnInit {


  constructor(private matDialog: MatDialog,
    private dialogRef: MatDialogRef<ManageRequestsDialogComponent>) { }
  ngOnInit(): void {

  }

  openDialog(): void {
    this.dialogRef.close();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.matDialog.open(ProfileInformationDialogComponent, dialogConfig);
    // const dialogRef = this.matDialog.open(ProfileInformationDialogComponent);
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
