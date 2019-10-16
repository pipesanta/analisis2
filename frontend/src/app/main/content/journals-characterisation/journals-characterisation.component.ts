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
          return filterText != null && filterText !== '';
        }),
        debounceTime(50),
        tap(filterText => console.log('Buscar por el revista que conicida con  ==> ', filterText)),
        mergeMap(filterText => this.journalsCharacterisationService.searchJournals$(filterText))
      )
      .subscribe((results: any) => {
        console.log(results); 
        var data= new Array();
        //this.resultList = results;
        for(var i = 0; i < results.length; i++) {
          var obj = results[i];
      
          //console.log(obj);
          data.push(obj);
        }
        this.resultList=data;
        
       
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