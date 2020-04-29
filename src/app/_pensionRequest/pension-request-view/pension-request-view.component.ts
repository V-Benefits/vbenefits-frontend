import { Component, OnInit } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { RoundModel } from '../pensionRequestModels';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PensionRequestModalComponent } from '../pension-request-modal/pension-request-modal.component';

@Component({
  selector: 'app-pension-request-view',
  templateUrl: './pension-request-view.component.html',
  styleUrls: ['./pension-request-view.component.css']
})
export class PensionRequestViewComponent implements OnInit {
  rounds: RoundModel[];

  constructor(private service: publicService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getAllRounds() {
    // this.service.getAll('RoundDate').subscribe( res =>
    //   this.rounds = res)
  }

  RequestPension() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    const dialogRef = this.dialog.open(PensionRequestModalComponent, dialogConfig);

  }
}
