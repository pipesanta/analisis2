////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime } from 'rxjs/operators';
import { InstitutionsIctivityCharacterisationService } from './institutions-activity-characterisation.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'institutions-activity-characterisation',
  templateUrl: './institutions-activity-characterisation.component.html',
  styleUrls: ['./institutions-activity-characterisation.component.scss']
})
export class InstitutionsActivityCharacterisationComponent implements OnInit, OnDestroy {

  filterTextControl = new FormControl('');
  resultList = [];

  constructor(
    private institutionsIctivityCharacterisationService: InstitutionsIctivityCharacterisationService
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
        mergeMap(filterText => this.institutionsIctivityCharacterisationService.getAnyInfoToTest$(filterText))
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
