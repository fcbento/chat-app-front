import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../core/generic-http/generic-http.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService extends GenericHttpService<any> {

  constructor(public http: HttpClient) { 
    super(http, environment.API_URL)
  }
}
