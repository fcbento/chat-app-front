import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { GenericHttpService } from '../generic-http/generic-http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>

  constructor(private http: HttpClient) {

    const localStorageUser = localStorage.getItem('currentUser')

    if (localStorageUser) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorageUser))
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(null)
    }
  }

  public get currentUserValue() {
    return this.currentUserSubject.value
  }

  public setCurrentUserValue(token: any) {
    if (token) {
      localStorage.setItem('currentUser', JSON.stringify(token))
    }
  }

  login(email: string, password: string) {
    return this.http
      .post(`${environment.API_URL_LOCAL}/user/login`, { email, password })
  }
}
