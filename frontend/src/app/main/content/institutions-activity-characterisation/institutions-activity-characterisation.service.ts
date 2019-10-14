import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of, from } from 'rxjs';
import { PART_O1, GUTI_01, GUTI_02 } from '../../fake-db/part01';
import { filter, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const SERVER_POST = 'http://localhost:7172/';

@Injectable()
export class InstitutionsIctivityCharacterisationService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getAnyInfoToTest$(filterText: string) {
     return of(PART_O1);
  }

  searchInstitutions$(textFilter: string) {
    return this.httpClient.get(`${SERVER_POST}institution/${textFilter}`);
  }

  getInstitutionInfo$(id) {
    return this.httpClient.get(`${SERVER_POST}institution/information/${id}`);
  }

  searchFields$(textFilter: string) {
    return this.httpClient.get(`${SERVER_POST}fields/${textFilter}`);
  }

  getFieldsInfo$(id) {
    return this.httpClient.get(`${SERVER_POST}fields/information/${id}`);
  }



}
