import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import  { of, from } from 'rxjs';
import { PART_O1 } from '../../fake-db/part01';
import { filter, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


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

  
}
