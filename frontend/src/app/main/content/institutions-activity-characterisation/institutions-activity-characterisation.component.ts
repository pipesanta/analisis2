////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime, startWith } from 'rxjs/operators';
import { combineLatest, Subject, of} from 'rxjs';
import { InstitutionsIctivityCharacterisationService } from './institutions-activity-characterisation.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'institutions-activity-characterisation',
  templateUrl: './institutions-activity-characterisation.component.html',
  styleUrls: ['./institutions-activity-characterisation.component.scss']
})
export class InstitutionsActivityCharacterisationComponent implements OnInit, OnDestroy {

  filterTextControl = new FormControl('');
  resultList = [];
  typeSelected$ = new Subject<null>();

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
      this.typeSelected$.pipe(startWith("INSTITUTION"))
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

    // this.filterTextControl.valueChanges
    //   .pipe(
    //     filter((filterText: any) => {
    //       return filterText != null && filterText !== '';
    //     }),
    //     debounceTime(500),
    //     tap(filterText => console.log('Buscar por el author que coincida con  ==> ', filterText)),
    //     mergeMap(filterText => this.institutionsIctivityCharacterisationService.searchInstitutions$(filterText)),

    //   )
    //   .subscribe((results: any) => {

    //     this.institutionList = results.institution;
    //     console.log('La respuesta ==> ', results);
    //   }


    //   );
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
    console.log("se dio click en => ", id );
    this.router.navigateByUrl('/institutions-activity-characterisation/detail/' + id );

  }




}
