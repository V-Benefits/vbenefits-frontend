import { Component, OnInit } from '@angular/core';
import { ManageRequestsDialogComponent } from '../../_manageRequests/manage-requests-dialog/manage-requests-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PensionRequestModalComponent } from 'src/app/_pensionRequest/pension-request-modal/pension-request-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

    if (!localStorage.getItem('StaffId')) {
      this.openDialog();
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ManageRequestsDialogComponent);
    //  const dialogRef = this.dialog.open(ProfileInformationDialogComponent);
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = "450px";
    // const dialogRef = this.dialog.open(PensionRequestModalComponent,dialogConfig);

    
  }

}
