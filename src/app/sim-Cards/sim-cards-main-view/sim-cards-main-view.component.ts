import { Component, OnInit } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { saveAs } from 'file-saver';
import { EligableRatePlanModel } from '../simCardRequestModel';
@Component({
  selector: 'app-sim-cards-main-view',
  templateUrl: './sim-cards-main-view.component.html',
  styleUrls: ['./sim-cards-main-view.component.css']
})
export class SimCardsMainViewComponent implements OnInit {
  userStaffId: number;
  eligableRatePlanModel: EligableRatePlanModel = new EligableRatePlanModel;

  constructor(private service: publicService) { }

  ngOnInit(): void {
    this.userStaffId = +localStorage.getItem('StaffId');
    this.getEmployeeEligibleRatePlan(this.userStaffId);
  }

  getEmployeeEligibleRatePlan(staffId: number) {
    debugger
    this.service.getModel(`SIMCardRequest/EmployeeEligibileRatePlan/${28896}`, null).subscribe(res => {
      console.log(res);
      this.eligableRatePlanModel = res;
    }, error => {
      console.log(error);
    });
  }

  goToLink() {
    let url = 'https://vfegyptssc.newsweaver.com/icfiles/1/75399/243920/6392041/6ce9af0b823f505838c9605c/business%20lines%20faqs.pdf';
    window.open(url, '_blank');
  }

  downloadPdf(pdfUrl: string, pdfName: string) {
    saveAs(pdfUrl, pdfName);
  }
}
