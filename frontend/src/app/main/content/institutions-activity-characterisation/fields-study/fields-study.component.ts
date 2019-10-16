////////// ANGULAR //////////
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime, merge, map } from 'rxjs/operators';
import { InstitutionsIctivityCharacterisationService } from '../institutions-activity-characterisation.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'fields-details',
  templateUrl: './fields-study.component.html',
  styleUrls: ['./fields-study.component.scss']
})
export class FieldsDetailsComponent implements OnInit, OnDestroy {

  fieldInfo = null;

  constructor(
    private institutionsIctivityCharacterisationService: InstitutionsIctivityCharacterisationService,
    private router: Router,
    private route: ActivatedRoute 
  ) {

  }

  ngOnInit() {
  this.loadFieldData();
  }

  loadFieldData(){
    this.route.params
      .pipe(
        map( params => params.id ),
        mergeMap(id => this.institutionsIctivityCharacterisationService.getFieldsInfo$(id) )
      )
    .subscribe((data: any) => {
        data.name =  data.institutions || 'No hay instituciones';
        this.fieldInfo = data;
    });
  }

  ngOnDestroy() {
  }

}
