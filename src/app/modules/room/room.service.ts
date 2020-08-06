import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../core/generic-http/generic-http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends GenericHttpService<any> {

  constructor(public http: HttpClient) {
    super(http, environment.API_URL, 'room/countries')
  }
}
