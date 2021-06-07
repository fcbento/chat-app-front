import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { Authentication } from './authentication.model';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  authentication = new Authentication()
  formType: boolean = true
  titleType: any
  socialButtons: any[] = []
  center: string = 'h-100 d-flex justify-content-center align-items-center';

  constructor
    (
      private service: AuthenticationService,
      private el: ElementRef,
      private router: Router,
      private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.titleType = 'Sign In'
    this.socialButtons = ['facebook', 'twitter', 'google']
  }

  changeFormType() {
    this.authentication.name = ''
    this.authentication.password = ''
    this.authentication.email = ''
    this.formType = !this.formType
    this.formType ? this.titleType = 'Sign In' : this.titleType = 'Sign Up'
  }

  onAuth(): void {
    this.service.authentication(this.authentication, this.formType)
      .subscribe(data => {
        this.service.setCurrentUserValue(data)
        if (this.formType)
          this.router.navigateByUrl('/room')
        else {
          this.notificationService.success('User created');
          this.formType = !this.formType;
        }
      }, err => {
        this.notificationService.error(err.error.message);
      })
  }

  getFormValues(value) {

    if (value.type === "email")
      this.authentication.email = value.content

    if (value.type === "password")
      this.authentication.password = value.content

    if (value.type === "name")
      this.authentication.name = value.content

  }

}
