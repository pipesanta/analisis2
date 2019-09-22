////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime } from 'rxjs/operators';
import { JournalsCharacterisationService } from './journals-characterisation.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'journals-characterisation',
  templateUrl: './journals-characterisation.component.html',
  styleUrls: ['./journals-characterisation.component.scss']
})
export class JournalsCharacterisationComponent implements OnInit, OnDestroy {

  filterTextControl = new FormControl('');
  resultList = [];

  constructor(
    private journalsCharacterisationService: JournalsCharacterisationService
  ) {

  }

  ngOnInit() {
    this.listenSearchbar();
  }


  listenSearchbar() {
    this.filterTextControl.valueChanges
      .pipe(
        filter((filterText: any) => {
          return filterText != null && filterText !== ''
        }),
        debounceTime(500),
        tap(filterText => console.log('Buscar por el author que conicida con  ==> ', filterText)),
        mergeMap(filterText => this.journalsCharacterisationService.getAnyInfoToTest$(filterText))
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
