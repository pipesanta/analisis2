import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of, from } from 'rxjs';
import { PART_O1 } from '../../fake-db/part01';
import { filter, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GUTI_01, GUTI_02 } from '../../fake-db/part01';


const SERVER_POST = 'http://localhost:7172/';

@Injectable()
export class JournalsCharacterisationService {
  constructor(
    private httpClient: HttpClient
    ) {}

    getAnyInfoToTest$(filterText: string){
      return of(PART_O1);
      // return this.httpClient.get(`${ip}institution/${filterText}`);

  }
  searchJournals$(textFilter: string) {
    return this.httpClient.get(`${SERVER_POST}journalCharacterisation/${textFilter}`);
  }

}
