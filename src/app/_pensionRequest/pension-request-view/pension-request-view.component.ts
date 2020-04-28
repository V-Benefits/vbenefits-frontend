import { Component, OnInit } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { RoundModel } from '../pensionRequestModels';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PensionRequestModalComponent } from '../pension-request-modal/pension-request-modal.component';
import {formatDate} from '@angular/common'
@Component({
  selector: 'app-pension-request-view',
  templateUrl: './pension-request-view.component.html',
  styleUrls: ['./pension-request-view.component.css']
})
export class PensionRequestViewComponent implements OnInit {
  rounds:RoundModel[];
 
  disableBtn:boolean = false;

  currentDate :string ;
  currentDate2:Date = new Date();

  firstRoundStartDate:Date = new Date("2020-02-18T00:00:00");
  firstRoundEndDate:Date = new Date("2020-02-25T00:00:00");

  secondRoundStartDate:Date =new Date("2020-11-18T00:00:00");
  secondRoundEndDate:Date = new Date("2020-11-25T00:00:00");
   
  constructor( private service: publicService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllRounds();
    
    this.currentDate =  formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.compareDates();
  }

  getAllRounds(){
    this.service.getAll('RoundDate').subscribe( res =>
      {
       this.rounds = res;
       console.log(this.rounds);
      }); 
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    const dialogRef = this.dialog.open(PensionRequestModalComponent,dialogConfig);
  }

  compareDates() {
    debugger
    if ((this.firstRoundStartDate <= this.currentDate2 && this.currentDate2 <= this.firstRoundEndDate) ||
     (this.secondRoundStartDate <= this.currentDate2 && this.currentDate2 <= this.secondRoundEndDate )) {
      this.disableBtn = false;
      console.log("trueeeeeeeeeeeeeeeee");
    }
    else {
      this.disableBtn = true;
      console.log("falseeeeeeeee");
    }

  }
  }

