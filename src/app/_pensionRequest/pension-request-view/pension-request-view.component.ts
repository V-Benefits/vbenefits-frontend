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
  isEligibleFlag: boolean = false;
  currentDate: Date = new Date();

  firstRoundStartDate: Date = new Date("2020-02-18T00:00:00");
  firstRoundEndDate: Date = new Date("2020-02-25T00:00:00");

  secondRoundStartDate: Date = new Date("2020-11-18T00:00:00");
  secondRoundEndDate: Date = new Date("2020-11-25T00:00:00");

  //isEligible: boolean = true;

  constructor(private service: publicService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.isEligible();
    this.getAllRounds();
   // this.isUserEligible();
    // this.compareDates();

  }
  getAllRounds() {
    this.service.getAll('RoundDate').subscribe(res => {
      this.rounds = res;
      console.log(this.rounds);
      this.compareDateWithRoundDates(this.rounds);
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
      this.openSnackBar('Not available! Please check pension round dates .');
    }
  }

  isEligible() {
    if (this.isEligibleFlag == false) {
      this.disableBtn = true;
      this.openSnackBar('Not available! Please check pension policy .');
    }
  }

  openSnackBar(message) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: ['snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
    });
  }

  compareDateWithRoundDates(rounds: RoundModel[]) {
    // rounds.forEach((element) => {
    //   let startDate = new Date(element.startDate);  
    //   let endDate = new Date(element.endDate);  
    //   console.log(startDate ,"*****startttttt****");
    //   console.log(this.currentDate ,"***current******");
    //   console.log(endDate ,"***endd******");

    //   if (startDate <= this.currentDate && this.currentDate <= endDate) {
    //     this.disableBtn = false;
    //   }
    //   else {
    //     this.disableBtn = true;
    //   }
    // });

    function isCurrentDateWithInRoundDates(round) {
      let currentDate = new Date();
      let startDate = new Date(round.startDate);
      let endDate = new Date(round.endDate);

      return startDate <= currentDate && currentDate <= endDate;
    }

    if (rounds.some(isCurrentDateWithInRoundDates))
      this.disableBtn = false;
    else {
      this.disableBtn = true;
    }
  }

  // isUserEligible(){
  //  if(this.pensionModel.isEligible)
  //   this.isEligible = true;
  //   else
  //   this.isEligible = false;

  // }


}

