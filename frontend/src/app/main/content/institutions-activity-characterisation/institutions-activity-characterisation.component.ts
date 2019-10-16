////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime, startWith } from 'rxjs/operators';
import { combineLatest, Subject, of} from 'rxjs';
import { InstitutionsIctivityCharacterisationService } from './institutions-activity-characterisation.service';
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'institutions-activity-characterisation',
  templateUrl: './institutions-activity-characterisation.component.html',
  styleUrls: ['./institutions-activity-characterisation.component.scss']
})
export class InstitutionsActivityCharacterisationComponent implements OnInit, OnDestroy {

  filterTextControl = new FormControl('');
  resultList = [];
  typeSelected$ = new BehaviorSubject('INSTITUTION');

  constructor(
    private institutionsIctivityCharacterisationService: InstitutionsIctivityCharacterisationService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.listenSearchbar();

  }


  listenSearchbar() {

    combineLatest(
      this.filterTextControl.valueChanges.pipe( startWith(""), debounceTime(500)),
      this.typeSelected$
      ).pipe(
      filter(([filterText, type ]) => filterText !== '' ),
      mergeMap( ([filterText, type]) => {

        if(type === 'INSTITUTION'){
          return this.institutionsIctivityCharacterisationService.searchInstitutions$(filterText)
        }else if(type === 'FIELD'){
          return this.institutionsIctivityCharacterisationService.searchFields$(filterText)
        }else {
          return of({});
        }
        
      } )
    ).subscribe(
      (result: any) => {
        this.resultList = [];
        this.resultList = result.field || result.institution;
        console.log(this.resultList);
      }
    )
  }

  showResults(results: any[]): void {
    console.log('Mostrar los sisguientes resultados ==> ', results);
  }

  ngOnDestroy() {




  }

  updateSelection(event: any){
    this.typeSelected$.next(event.value);
  }


  navigateToDetail(id: string){
    const tipo = this.typeSelected$.getValue();
    console.log("se dio click en => ", id );
    if (tipo === 'INSTITUTION'){
      this.router.navigateByUrl('/institutions-activity-characterisation/detail/' + id );
    }else if (tipo === 'FIELD'){
      this.router.navigateByUrl('/institutions-activity-characterisation/field-detail/' + id );
    }
      
    
  }




}
