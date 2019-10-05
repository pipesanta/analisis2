import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import  { of, from } from 'rxjs';
import { PART_O1 } from '../../fake-db/part01';
import { filter, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthorColaborationsService {
  constructor(
    private httpClient: HttpClient
    ) {}

  getArticlesByAuthor$(filterText: string){
    

    return this.httpClient.get("http://localhost:7070/alarm/getAlarms")

  }

  
}
