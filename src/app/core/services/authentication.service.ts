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

    const localStorageUser = localStorage.get('currentUser')

    if (localStorageUser) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorageUser))
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(null)
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  login(email: string, password: string) {
    return this.http
      .post(`${environment.API_URL}/user/login`, { email, password })
      .pipe(map((user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.currentUserSubject.next(user)
        }
      }))
  }
}
