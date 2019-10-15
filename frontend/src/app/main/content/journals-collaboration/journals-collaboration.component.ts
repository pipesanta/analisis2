////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime } from 'rxjs/operators';
import { JournalsCollaborationService } from './journals-collaboration.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'journals-collaboration',
  templateUrl: './journals-collaboration.component.html',
  styleUrls: ['./journals-collaboration.component.scss']
})
export class JournalsCollaborationComponent implements OnInit, OnDestroy {

  filterTextControl = new FormControl('');
  resultList = [];

  constructor(
    private journalsCollaborationService: JournalsCollaborationService
  ) {

  }

  ngOnInit() {
    this.listenSearchbar();
  }


  listenSearchbar() {
    this.filterTextControl.valueChanges
      .pipe(
        filter((filterText: any) => {
          return filterText != null && filterText !== '';
        }),
        debounceTime(500),
        tap(filterText => console.log('Buscar por el author que conicida con  ==> ', filterText)),
        mergeMap(filterText => this.journalsCollaborationService.getAnyInfoToTest$(filterText))
      )
      .subscribe(results => {
        this.resultList = results;
      }


      );
  }

  showResults(results: any[]): void {
    console.log('Mostrar los sisguientes resultados ==> ', results);



  }

  ngOnDestroy() {




  }
}
