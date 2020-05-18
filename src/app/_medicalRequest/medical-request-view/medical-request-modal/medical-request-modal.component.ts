import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { publicService } from 'src/app/core/publicService.service';
import { ViewEncapsulation } from '@angular/compiler/src/compiler_facade_interface';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-medical-request-modal',
  templateUrl: './medical-request-modal.component.html',
  styleUrls: ['./medical-request-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicalRequestModalComponent implements OnInit {
  seasons: string[] = ['New card', 'Replacement for lost one'];
  requestForList: string[] = ['Myself', 'Children'];
  public imagePath: File;
  imgURL: any;
  message: string;
  imageName: string;
  displayUploadImage: boolean = false;

  constructor(public dialogRef: MatDialogRef<MedicalRequestModalComponent>,
    private matDialog: MatDialog,
    private service: publicService) { }

  ngOnInit(): void {
  }

  onRequestSelection(value) {
    if (value == "Myself")
      this.displayUploadImage = true;
    else
      this.displayUploadImage = false;
  }

  onCardTypeSelection(value) {

  }

  preview(files) {
    console.log(files.type, "&&&&&&&&&&&&&&");

    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    var mimeSize = files[0].size;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    this.imageName = files[0].name;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  deleteImg() {
    this.imgURL = '';
    this.imagePath = null;
    console.log(this.imagePath, "&&&&&&&&&&&&&&");
  }

  saveButton() {
    this.openSuccessDialog()
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openSuccessDialog() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { header: "Submitted Request", paragraph: "Your request is submitted successfully.You can track your request from track section" };
    this.matDialog.open(SuccessDialogComponent, dialogConfig);
  }
}
