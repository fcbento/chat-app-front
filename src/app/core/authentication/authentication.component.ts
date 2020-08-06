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

  constructor(private service: AuthenticationService, private el: ElementRef, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.titleType = 'Sign In'
    this.socialButtons = ['facebook', 'twitter', 'google']
  }

  changeFormType() {
    this.changeForm(this.formType)
    this.authentication.name = ''
    this.authentication.password = ''
    this.authentication.email = ''
    this.formType = !this.formType
    this.formType ? this.titleType = 'Sign In' : this.titleType = 'Sign Up'
  }

  changeForm(formType) {

    let item = this.el.nativeElement.querySelector('.container-auth')

    if (formType) {
      item.classList.add('sign-up-mode')
    } else {
      item.classList.remove('sign-up-mode')
    }
  }

  onAuth(): void {
    this.service.authentication(this.authentication, this.formType)
      .subscribe(data => {
        this.service.setCurrentUserValue(data)
        if (this.formType) {
          this.router.navigateByUrl('/room')
        }
      }, err => {
        console.log(err)
        this.notificationService.error();
      })
  }

  getFormValues(value) {
    if (value.type === "email") {
      this.authentication.email = value.content
    }

    if (value.type === "password") {
      this.authentication.password = value.content
    }

    if (value.type === "name") {
      this.authentication.name = value.content
    }
  }

}
