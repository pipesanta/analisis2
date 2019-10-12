////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime } from 'rxjs/operators';
import { InstitutionsIctivityCharacterisationService } from '../institutions-activity-characterisation.service';
import {Router} from '@angular/router';

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

  constructor(
    private institutionsIctivityCharacterisationService: InstitutionsIctivityCharacterisationService,
    private router: Router
  ) {

  }

  ngOnInit() {

  }


  ngOnDestroy() {




  }

}
