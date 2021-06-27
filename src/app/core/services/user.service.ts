import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GenericHttpService } from '../generic-http/generic-http.service';

@Injectable({
    providedIn: 'root'
})

export class UserService extends GenericHttpService<any> {

    constructor(public http: HttpClient) {
        super(http, environment.API_URL)
    }
}