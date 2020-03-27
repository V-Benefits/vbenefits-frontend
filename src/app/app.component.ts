import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ManageRequestsDialogComponent } from './_manageRequests/manage-requests-dialog/manage-requests-dialog.component';
import { ProfileInformationDialogComponent } from './_profileInformation/profile-information-dialog/profile-information-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'benefits-frontend';
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
     this.openDialog();
   }
  openDialog(): void {
    //const dialogRef = this.dialog.open(ManageRequestsDialogComponent);
    const dialogRef = this.dialog.open(ProfileInformationDialogComponent);

}
}