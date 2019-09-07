////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
//////////// ANGULAR MATERIAL ///////////
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatSnackBar,
  MatDialog
} from '@angular/material';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'page-no-found',
  templateUrl: './page-no-found.component.html',
  styleUrls: ['./page-no-found.component.scss']
})
export class PageNoFoundComponent implements OnInit, OnDestroy {

  ngOnInit() {
  }


  ngOnDestroy() {
  }
}
