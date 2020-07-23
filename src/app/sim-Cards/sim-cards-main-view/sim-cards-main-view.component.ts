import { Component, OnInit } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { saveAs } from 'file-saver';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimCardRequestEditDialogComponent } from '../../_simCardsRequest/sim-card-request-edit-dialog/sim-card-request-edit-dialog.component';

@Component({
  selector: 'app-sim-cards-main-view',
  templateUrl: './sim-cards-main-view.component.html',
  styleUrls: ['./sim-cards-main-view.component.css']
})
export class SimCardsMainViewComponent implements OnInit {

  // require: any
  // FileSaver = require('file-saver');

  constructor(private service: publicService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployeeEligibleRatePlan();
  }

  getEmployeeEligibleRatePlan() {
    this.service.getAll('').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  RequestSIMCard() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "400px";
    this.dialog.open(SimCardRequestEditDialogComponent, dialogConfig);
  }

  goToLink() {
    let url = 'https://vfegyptssc.newsweaver.com/icfiles/1/75399/243920/6392041/6ce9af0b823f505838c9605c/business%20lines%20faqs.pdf';
    window.open(url, '_blank');
  }

  downloadPdf(pdfUrl: string, pdfName: string) {
    saveAs(pdfUrl, pdfName);
  }
}
