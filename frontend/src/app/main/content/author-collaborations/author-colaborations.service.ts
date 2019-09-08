import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import  { of, from } from 'rxjs';
import { GatewayService } from '../../../api/gateway.service';
import { PART_O1 } from '../../fake-db/part01';
import { filter, toArray } from 'rxjs/operators';


@Injectable()
export class AuthorColaborationsService {
  constructor(private gateway: GatewayService) {}

  getArticlesByAuthor$(filterText: string){
    return from(PART_O1)
    .pipe(
      // filter(article => (article.name.toUpperCase()).includes(filterText.toUpperCase()))
      toArray()
    );

  }

  
}
