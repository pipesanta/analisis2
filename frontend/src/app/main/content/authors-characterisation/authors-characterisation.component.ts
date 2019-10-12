////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime } from 'rxjs/operators';
import { AuthorsCharacterisationService } from './authors-characterisation.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'authors-characterisation',
  templateUrl: './authors-characterisation.component.html',
  styleUrls: ['./authors-characterisation.component.scss']
})
export class AuthorsCharacterisationComponent implements OnInit, OnDestroy {

  filterTextControl = new FormControl('');
  resultList = [];
  institutionList = [];

  constructor(
    private authorsCharacterisationService: AuthorsCharacterisationService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.listenSearchbar();

    this.authorsCharacterisationService.searchInstitutions$()
    .subscribe(
      result => {
        this.institutionList = result;
      }
    )

  }


  listenSearchbar() {
    this.filterTextControl.valueChanges
      .pipe(
        filter((filterText: any) => {
          return filterText != null && filterText !== ''
        }),
        debounceTime(500),
        tap(filterText => console.log('Buscar por el author que conicida con  ==> ', filterText)),
        mergeMap(filterText => this.authorsCharacterisationService.getAnyInfoToTest$(filterText))
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

  navigateToDetail(id: string){
    console.log("se dio click en => ", id );
    this.router.navigateByUrl('/authors-characterisation/detail');

  }
}
