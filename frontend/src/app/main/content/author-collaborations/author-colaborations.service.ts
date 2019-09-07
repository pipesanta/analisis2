import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import  { of } from 'rxjs';
import { GatewayService } from '../../../api/gateway.service';

@Injectable()
export class AuthorColaborationsService {
  constructor(private gateway: GatewayService) {}

  
}
