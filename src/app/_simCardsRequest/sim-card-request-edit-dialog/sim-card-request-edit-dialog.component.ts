import { Component, OnInit } from '@angular/core';
import { SIMcardsRequestModel } from '../Models/SIMcardsRequestModel';
@Component({
  selector: 'app-sim-card-request-edit-dialog',
  templateUrl: './sim-card-request-edit-dialog.component.html',
  styleUrls: ['./sim-card-request-edit-dialog.component.css']
})
export class SimCardRequestEditDialogComponent implements OnInit {

  requestForList: string[] = ['Myself', 'Family or friends (deductible from salary)'];
  requestTypeList: string[] = ['newLine', 'Change Line Rate Plan'];
  RatePlanTypeList: string[] = ['Red 300 (default)', 'Red 500', 'Red 800'];

  simCardsRequestModel: SIMcardsRequestModel = new SIMcardsRequestModel();

  constructor() { }

  ngOnInit(): void {
  }

  onRequestForSelection(value) {
    debugger;
    this.simCardsRequestModel.requestFor = value;
    this.simCardsRequestModel.requestType = "";
    this.simCardsRequestModel.ratePlan = "";
  }
  onRequestTypeSelection(value) {
    debugger;
    this.simCardsRequestModel.requestType = value;
    this.simCardsRequestModel.ratePlan = "";
  }

  onRatePlanSelection(value) {
    debugger;
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

}
