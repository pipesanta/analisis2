////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime } from 'rxjs/operators';
import { InstitutionsIctivityCharacterisationService } from '../institutions-activity-characterisation.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'inst-characterisation',
  templateUrl: './fields-study.component.html',
  styleUrls: ['./fields-study.component.scss']
})
export class FieldsStudyComponent implements OnInit, OnDestroy {

  filterTextControl = new FormControl('');
  resultList = [];
  institutionList = [];

  constructor(
    private institutionsIctivityCharacterisationService: InstitutionsIctivityCharacterisationService,
    private router: Router
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
        tap(filterText => console.log('Buscar por el author que coincida con  ==> ', filterText)),
        mergeMap(filterText => this.institutionsIctivityCharacterisationService.searchFields$(filterText)),

      )
      .subscribe((results: any) => {

        this.institutionList = results.institution;
        console.log('La respuesta ==> ', results);
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
    this.router.navigateByUrl('/institutions-activity-characterisation/field/' + id );

  }




}
