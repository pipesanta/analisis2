import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild, OnDestroy, Input } from '@angular/core';
import { FuseConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs/Subscription';
import { locale as english } from '../../../main/i18n/en';
import { locale as spanish } from '../../../main/i18n/es';
import { FuseTranslationLoaderService } from '../../services/translation-loader.service';
import { Observable } from 'rxjs/Observable';
import { fromEvent, Subject, of, defer, from, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, filter, map, takeUntil, tap, mapTo, toArray, startWith, delay, catchError } from 'rxjs/operators';
import { SearchBarService } from './search-bar.service';
// import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'fuse-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class FuseSearchBarComponent implements OnInit, OnDestroy {
  collapsed: boolean;
  toolbarColor: string;
  @Output() onBusinessSelected: EventEmitter<any> = new EventEmitter();
  @Input() selectedBU: any;
  onSettingsChanged: Subscription;

  businessQueryFiltered$: Observable<any>;
  @ViewChild('inputFilter') inputFilter: ElementRef;
  private ngUnsubscribe = new Subject();
  userRoles: string[] = [];
  userDetails = {};

  ALL_BUSINESS_REF = { id: null, name: 'TOOLBAR.ALL_BUSINESS_NAME', attributes: []};

  constructor(
    private fuseConfig: FuseConfigService,
    private translationLoader: FuseTranslationLoaderService,
    private searchBarService: SearchBarService,
  ) {
    this.translationLoader.loadTranslations(english, spanish);
    this.collapsed = true;
    this.onSettingsChanged = this.fuseConfig.onSettingsChanged.subscribe(
      newSettings => {
        this.toolbarColor = newSettings.colorClasses.toolbar;
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  buildBusinessResponse$(id, name){
    return of({
      data: {
        myBusiness: {
          _id: id,
          generalInfo: { name: name },
          attributes: []
        }
      }
    });
  }

  collapse() {
    this.collapsed = true;
  }

  expand() {
    if (this.userRoles.includes('PLATFORM-ADMIN')){
      this.collapsed = false;
    }
  }


  onSelectBusinessEvent(business) {
    this.onBusinessSelected.emit(business);
    this.collapse();
  }

  displayFn(business) {
    return business ? business.name : '';
  }

  getBusinessFiltered$(filterText: string): Observable<any[]> {
   
      return of([]);
  }
}
