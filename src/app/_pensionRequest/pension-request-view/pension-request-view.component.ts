import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { RoundModel } from '../pensionRequestModels';

import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { PensionRequestModalComponent } from '../pension-request-modal/pension-request-modal.component';
import { formatDate } from '@angular/common'
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
@Component({
  selector: 'app-pension-request-view',
  templateUrl: './pension-request-view.component.html',
  styleUrls: ['./pension-request-view.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PensionRequestViewComponent implements OnInit {

  rounds: RoundModel[];

  disableBtn: boolean = false;
  currentDate: Date = new Date();

  firstRoundStartDate: Date = new Date("2020-02-18T00:00:00");
  firstRoundEndDate: Date = new Date("2020-02-25T00:00:00");

  secondRoundStartDate: Date = new Date("2020-11-18T00:00:00");
  secondRoundEndDate: Date = new Date("2020-11-25T00:00:00");

  constructor(private service: publicService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllRounds();
    this.compareDates();
  }
  getAllRounds() {
    this.service.getAll('RoundDate').subscribe(res => {
      this.rounds = res;
      console.log(this.rounds);
    });
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    const dialogRef = this.dialog.open(PensionRequestModalComponent, dialogConfig);
  }

  compareDates() {
    if ((this.firstRoundStartDate <= this.currentDate && this.currentDate <= this.firstRoundEndDate) ||
      (this.secondRoundStartDate <= this.currentDate && this.currentDate <= this.secondRoundEndDate)) {
      this.disableBtn = false;
    }
    else {
      this.disableBtn = true;
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: 'Not available! Please check pension round dates .',
      panelClass: ['snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
    });
  }
}

