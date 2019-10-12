import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of, from } from 'rxjs';
import { PART_O1, GUTI_01, GUTI_02 } from '../../fake-db/part01';
import { filter, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const ip = 'http://192.168.50.53:7172/';

@Injectable()
export class InstitutionsIctivityCharacterisationService {
  constructor(
    private httpClient: HttpClient
    ) {}

    getAnyInfoToTest$(filterText: string){
    return from(PART_O1)
    .pipe(
      // filter(article => (article.name.toUpperCase()).includes(filterText.toUpperCase()))
      toArray()
    );

    // return this.httpClient.get("localhost:getAuthorCol")

  }

  searchInstitutions$(){
    return of(GUTI_01);
    // return this.httpClient.get("localhost:getAuthorCol")
  }

  getInstitutionInfo$(id){
    return of(GUTI_02);
    // return this.httpClient.get("localhost:getAuthorCol", {id})
  }

  
}
