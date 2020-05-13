import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { RoundModel, PensionRequestModel } from '../pensionRequestModels';

import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { PensionRequestModalComponent } from '../pension-request-modal/pension-request-modal.component';
import { formatDate } from '@angular/common'
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { CreatePensionRequestModel } from '../models/pensionModel';
@Component({
  selector: 'app-pension-request-view',
  templateUrl: './pension-request-view.component.html',
  styleUrls: ['./pension-request-view.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PensionRequestViewComponent implements OnInit {
  userStaffId: number;
  numberOfYearsToEnroll: number;
  numberOfMonthsToEnroll: number;

  rounds: RoundModel[] = [];
  pensionRequestModel: CreatePensionRequestModel;

  disableBtn: boolean = false;
  isEligibleFlag: boolean = true;
  isUserSubmitRequest: boolean = true;
  isEnrolled: boolean = true;

  currentDate: Date = new Date();
  secondRoundEndDate: Date = new Date("2020-11-25T00:00:00");
  firstRoundEndDate: Date = new Date("2020-02-25T00:00:00");
  firstRoundStartDate: Date = new Date("2020-02-18T00:00:00");
  secondRoundStartDate: Date = new Date("2020-11-18T00:00:00");

  constructor(private service: publicService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllRounds();
    this.getPensionDetails();
    this.checkIfUserSubmittedRequest();
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
    dialogConfig.data = this.pensionRequestModel;
    this.dialog.open(PensionRequestModalComponent, dialogConfig);
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

  openSnackBar(message) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration: 10000,
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

  getPensionDetails() {
    this.userStaffId = +localStorage.getItem('StaffId');
    this.service.get('PensionRequest', this.userStaffId).subscribe(res => {
      this.pensionRequestModel = res;
      console.log(this.pensionRequestModel, "******PensionRequest***************************");
      this.isUserEligible(this.pensionRequestModel);
      this.isUserEnrolled(this.pensionRequestModel);
    })
  }

  isUserEligible(pensionModel: CreatePensionRequestModel) {
    if (pensionModel.isEligible)
      this.isEligibleFlag = true;
    else {
      this.isEligibleFlag = false;
      this.openSnackBar('Not available! Please check pension policy .');
    }
  }

  isUserEnrolled(pensionModel: CreatePensionRequestModel) {
    if (pensionModel.isEnrolled)
      this.isEnrolled = true;
    else {
      this.isEnrolled = false;
      this.numberOfMonthsToEnroll = Math.floor(pensionModel.numberOfMonthsToEnroll);
      this.numberOfYearsToEnroll = Math.floor(pensionModel.numberOfMonthsToEnroll / 12);

      this.openSnackBar(`You are not enrolled yet, you will be enrolled in ${this.numberOfYearsToEnroll} Years and ${this.numberOfMonthsToEnroll} Months`);
    }
  }

  checkIfUserSubmittedRequest() {
    if (!localStorage.getItem('IsUserEligible'))
      this.isUserSubmitRequest = false;
    else {
      this.isUserSubmitRequest = true;
      this.openSnackBar('You already submitted a pension Request.');
    }
  }

}

