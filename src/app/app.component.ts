import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ManageRequestsDialogComponent } from './_manageRequests/manage-requests-dialog/manage-requests-dialog.component';
import { ProfileInformationDialogComponent } from './_profileInformation/profile-information-dialog/profile-information-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // router: string;
  // title = 'benefits-frontend';
  constructor(public dialog: MatDialog, private router: Router) {
    // this.router = _router.url;
  }
  ngOnInit(): void {
    //  this.openDialog();
  }
  openDialog(): void {
    this.dialog.open(ManageRequestsDialogComponent);
  }
}