import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  authentication(authObj: any, authType: boolean) {
    if (authType) {
      return this.http
        .post(`${environment.API_URL}/user/login`, { email: authObj.email, password: authObj.password })
    } else {
      return this.http
        .post(`${environment.API_URL}/user`, { name: authObj.name, email: authObj.email, password: authObj.password })
    }
  }
}
