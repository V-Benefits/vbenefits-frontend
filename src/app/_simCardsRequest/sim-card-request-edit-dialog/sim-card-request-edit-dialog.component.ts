import { Component, OnInit } from '@angular/core';
import { SIMcardsRequestModel } from '../Models/SIMcardsRequestModel';
import { publicService } from 'src/app/core/publicService.service';
import { config } from 'rxjs';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-sim-card-request-edit-dialog',
  templateUrl: './sim-card-request-edit-dialog.component.html',
  styleUrls: ['./sim-card-request-edit-dialog.component.css']
})
export class SimCardRequestEditDialogComponent implements OnInit {

  // requestForList: string[] = ['Myself', 'Family or friends (deductible from salary)'];
  // requestTypeList: string[] = ['newLine', 'Change Line Rate Plan'];
  // RatePlanTypeList: string[] = ['Red 300 (default)', 'Red 500', 'Red 800'];

  simCardsRequestModel: SIMcardsRequestModel = new SIMcardsRequestModel();
  requestForList: string[];
  requestTypeList: string[];
  ratePlanTypeList: string[];
  userStaffId: number;
  employeeBand: string;

  constructor(private service: publicService,
    public dialogRef: MatDialogRef<SimCardRequestEditDialogComponent>) { }

  ngOnInit(): void {
    this.getEmployeeDataFromLocalStorage();
    this.getRequestForList();
  }

  getEmployeeDataFromLocalStorage() {
    this.userStaffId = +localStorage.getItem('StaffId');
    this.employeeBand = localStorage.getItem('Band');
  }

  getRequestForList() {
    this.service.getAll('SIMCardRequest/RequestFor').subscribe(res => {
      this.requestForList = res;
    }, error => {
      console.log(error);
    });
  }

  getRequestTypesList(requestForValue: string) {
    this.service.getAll(`SIMCardRequest/RequestType/${requestForValue}`).subscribe(res => {
      this.requestTypeList = res;
    }, error => {
      console.log(error);
    });
  }

  getRatePlansList() {
    this.service.getAll(`SIMCardRequest/RatePlans/${this.employeeBand}`).subscribe(res => {
      this.ratePlanTypeList = res;
      console.log(this.ratePlanTypeList, "&&&&&&&&&&&&&&&&&&&&&&&");
    }, error => {
      console.log(error);
    });
  }

  onRequestForSelection(value) {
    this.simCardsRequestModel.requestFor = value;
    this.getRequestTypesList(value);
    this.simCardsRequestModel.requestType = "";
    this.simCardsRequestModel.ratePlan = "";
  }
  onRequestTypeSelection(value) {
    this.getRatePlansList();
    this.simCardsRequestModel.requestType = value;
    this.simCardsRequestModel.ratePlan = "";
  }

  onRatePlanSelection(value) {
    this.simCardsRequestModel.ratePlan = value;
  }

  previewImage(files) {
    if (files.length === 0)
      return;

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.simCardsRequestModel.nationalIDImageURL = reader.result;
      this.simCardsRequestModel.nationalIDImageName = files[0].name;
    }
  }

  fillSimCardsModel() {
    // this.userStaffId;
    this.simCardsRequestModel.staffId = 26018;
    this.simCardsRequestModel.requestedOn = new Date;
    // this.simCardsRequestModel.simSerialNumber =
    //   this.simCardsRequestModel.dataSimPlan =
  }

  addSimCardRequest() {
    this.fillSimCardsModel();
    console.log(this.simCardsRequestModel, "------------------------------");
    this.service.post(this.simCardsRequestModel, 'SIMCardRequest').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
