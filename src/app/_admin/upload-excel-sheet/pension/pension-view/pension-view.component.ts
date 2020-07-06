import { Component, OnInit, ViewChild } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { MatTableDataSource, MatPaginator, MatSortModule, MatSort, Sort, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  contribution: number;
  beginingBalance: number;
  availableBalance: number;
  withdrawn: number;
  status: string;
  id: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 12354,
    name: 'Hydrogen',
    contribution: 16.001,
    beginingBalance: 22,
    availableBalance: 7777,
    withdrawn: 22,
    status: 'Approved'
  }
];


@Component({
  selector: 'app-pension-view',
  templateUrl: './pension-view.component.html',
  styleUrls: ['./pension-view.component.css']
})
export class PensionViewComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];

  displayedColumns: string[] = ['id', 'name', 'begining balance', 'contribution', 'available balance', 'withdrawn', 'status', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  // requestsList: RequestModel[] = [];
  // dataSource: MatTableDataSource<RequestModel>;
  constructor(
    private service: publicService,
    private dialog: MatDialog) {
    // this.dataSource = new MatTableDataSource<RequestModel>();
  }

  ngOnInit(): void {
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
