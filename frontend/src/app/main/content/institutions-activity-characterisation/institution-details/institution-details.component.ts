////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime, merge, map } from 'rxjs/operators';
import { InstitutionsIctivityCharacterisationService } from '../institutions-activity-characterisation.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'inst-characterisation',
  templateUrl: './institution-details.component.html',
  styleUrls: ['./institution-details.component.scss']
})
export class InstitutionDetailsComponent implements OnInit, OnDestroy {

  filterTextControl = new FormControl('');
  resultList = [];
  institutionList = [];

  institutioinInfo = null;

  constructor(
    private institutionsIctivityCharacterisationService: InstitutionsIctivityCharacterisationService,
    private router: Router,
    private route: ActivatedRoute 
  ) {

  }

  ngOnInit() {

    this.loadInstitutionData();


  }

  loadInstitutionData(){
    this.route.params
      .pipe(
        map( params => params.id ),
        mergeMap(id => this.institutionsIctivityCharacterisationService.getInstitutionInfo$(id) )
      )
    .subscribe((data: any) => {
        data.name =  data.name || 'Sin nombre';
        data.authors = data.authors || 'No hay autores correspondientes';
        data.topics = data.topics || 'No hay campos de estudio';
        data.articles = data.articles || 'No hay artículos';
        this.institutioinInfo = data;
    });
  }

  ngOnDestroy() {




  }

}
