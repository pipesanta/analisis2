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

/**
 * @title Button varieties
 */
@Component({
  selector: 'example-button-row',
  templateUrl: 'journals-characterisation.component.html',
  styleUrls: ['journals-characterisation.component.scss'],
})

export class JournalsCharacterisationComponent implements OnInit, OnDestroy {

  searchValue = new FormControl('');
  filterTextControl = new FormControl('');
  resultList = [];

  constructor(
    private journalsCharacterisationService: JournalsCharacterisationService

  ) {

  }

  ngOnInit() {
    this.listenSearchbar();

  }

  /*
  onSubmit(event: any, searchType): void {
    let filterText = event.target.search.value;
    console.log(searchType);
    console.log(filterText);
  }
  */

  clickName(event) {
    // just added console.log which will display the event details in browser on click of the button.
    alert('Buscando por nombre');
    console.log(event);
  }

  clickIssn(event) {
    // just added console.log which will display the event details in browser on click of the button.
    alert('Buscando por ISSN');
    console.log(event);
  }

  listenSearchbar() {
    this.filterTextControl.valueChanges
      .pipe(
        filter((filterText: any) => {
          return filterText != null && filterText !== '';
        }),
        debounceTime(50),
        tap(filterText => console.log('Buscar por el revista que conicida con  ==> ', filterText + '>' + 'issn')),
        mergeMap(filterText => this.journalsCharacterisationService.searchJournals$(filterText))
      )
      .subscribe((results: any) => {
        console.log(results);
          // tslint:disable-next-line:prefer-const
        let data = [];
        for (let i = 0; i < results.length; i++) {
          const obj = results[i];
          // console.log(obj);
          data.push(obj);
        }
        this.resultList = data;
        results = null;


      }



      );
  }



  ngOnDestroy() {




  }


}



/**
 * @title Expansion panel as accordion
 */
@Component({
  selector: 'journals-characterisation',
  templateUrl: './journals-characterisation.component.html',
  styleUrls: ['./journals-characterisation.component.scss']
})
export class ExpansionStepsExample {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
