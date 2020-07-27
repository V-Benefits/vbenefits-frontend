import { Component, OnInit } from '@angular/core';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-nursery-request-view',
  templateUrl: './nursery-request-view.component.html',
  styleUrls: ['./nursery-request-view.component.css']
})
export class NurseryRequestViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  DownloadFAQPDF()
  {
    const pdfUrl = '../../../assets/files/NurseryAllowance Guide.pdf';
    const pdfName = 'FAQ_pdf_file';
    FileSaver.saveAs(pdfUrl, pdfName);
  }

}
