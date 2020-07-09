import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { MatTableDataSource, MatPaginator, MatSortModule, MatSort, Sort, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PensionRequestModel } from 'src/app/_admin/Models/pensionRequestModel';

export interface PeriodicElement {
  name: string;
  contribution: number;
  beginingBalance: number;
  availableBalance: number;
  withdrawn: number;
  status: string;
  id: number;
}



@Component({
  selector: 'app-pension-view',
  templateUrl: './pension-view.component.html',
  styleUrls: ['./pension-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PensionViewComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  all=false;
  approved=false;
  rejected=false;
  canceled=false;

  pensionRequestList : PensionRequestModel[];
  pensionFilteredList : PensionRequestModel[];

  // ELEMENT_DATA: PeriodicElement []= [
  //   {
  //     id: 12354,
  //     name: 'Mohamed Ahmed Am..',
  //     contribution: 16.001,
  //     beginingBalance: 75.000,
  //     availableBalance: 95000,
  //     withdrawn: 50000,
  //     status: 'Approved'
  //   }, {
  //     id: 12354,
  //     name: 'Hydrogen',
  //     contribution: 16.001,
  //     beginingBalance: 22,
  //     availableBalance: 7777,
  //     withdrawn: 22,
  //     status: 'Canceled'
  //   }, {
  //     id: 12354,
  //     name: 'Hydrogen',
  //     contribution: 16.001,
  //     beginingBalance: 22,
  //     availableBalance: 7777,
  //     withdrawn: 22,
  //     status: 'Rejected'
  //   }, {
  //     id: 12354,
  //     name: 'Hydrogen',
  //     contribution: 16.001,
  //     beginingBalance: 22,
  //     availableBalance: 7777,
  //     withdrawn: 22,
  //     status: 'Approved'
  //   }, {
  //     id: 12354,
  //     name: 'Hydrogen',
  //     contribution: 16.001,
  //     beginingBalance: 22,
  //     availableBalance: 7777,
  //     withdrawn: 22,
  //     status: 'Approved'
  //   }, {
  //     id: 12354,
  //     name: 'Hydrogen',
  //     contribution: 16.001,
  //     beginingBalance: 22,
  //     availableBalance: 7777,
  //     withdrawn: 22,
  //     status: 'Approved'
  //   }, {
  //     id: 12354,
  //     name: 'Hydrogen',
  //     contribution: 16.001,
  //     beginingBalance: 22,
  //     availableBalance: 7777,
  //     withdrawn: 22,
  //     status: 'Approved'
  //   }, {
  //     id: 12354,
  //     name: 'Hydrogen',
  //     contribution: 16.001,
  //     beginingBalance: 22,
  //     availableBalance: 7777,
  //     withdrawn: 22,
  //     status: 'Approved'
  //   },
  // ];
  displayedColumns: string[] = ['first', 'second', 'id', 'name', 'begining balance', 'contribution', 'available balance', 'withdrawn', 'status', 'actions'];
  dataSource = new MatTableDataSource<PensionRequestModel>(this.pensionRequestList);
  selection = new SelectionModel<PensionRequestModel>(true, []);

  // requestsList: RequestModel[] = [];
  // dataSource: MatTableDataSource<RequestModel>;
 

  constructor(
    private service: publicService,
    private dialog: MatDialog) {
    // this.dataSource = new MatTableDataSource<RequestModel>();
  }

  ngOnInit(): void {
    debugger;
     this.getPensionListData();
  }

  filterApproved(){
    this.approved = true;
    this.all=false;
    this.canceled=false;
    this.pensionFilteredList = this.pensionRequestList.filter(function (el) {
      return el.status == "Approved";        
    });

    this.dataSource.data = this.pensionFilteredList;
  }

  filterCanceled(){
    this.all=false;
    this.approved=false;
    this.canceled=true;
    this.pensionFilteredList = this.pensionRequestList.filter(function (el) {
      return el.status == "Canceled";        
    });

    this.dataSource.data = this.pensionFilteredList;
  }

  getAllData(){
    // DB_DATA = database
    // this.ELEMENT_DATA = DB_DATA;
  }

  getPensionListData(){
    this.service.getAll('PensionRequest/GetAllPensionRequests').subscribe(
      res => {
        this.pensionRequestList = res;
        console.log('getallpension res list--> ', this.pensionRequestList);
      },
      err => {
        console.log('getallpension error -->', err);
      }
    );
  }
  

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement) {
    // if (!row) {
    //   return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    // }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   // if (!row) {
  //   //   return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   // }
  //   // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

}
