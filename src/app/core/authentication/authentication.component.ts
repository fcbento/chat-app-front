import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import { Authentication } from './authentication.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  authentication = new Authentication()
  formType: boolean = true
  titleType: any
  @ViewChild('input') input: InputComponent

  constructor(private service: AuthenticationService, private el: ElementRef) { }

  ngOnInit(): void {
    this.titleType = 'Sign In'
  }

  changeFormType() {
    this.changeForm(this.formType)
    this.input.form.reset()
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
    this.service.authentication(this.authentication.name, this.authentication.email, this.authentication.password, this.formType)
      .subscribe(data => {
        this.service.setCurrentUserValue(data)
      })
  }

  getFormValues(value) {

    if (this.formType) {
      return this.loginValues(value)

    } else {
      return this.registerValues(value)
    }
  }

  private loginValues(value) {
    if (value.email) {
      this.authentication.email = value.email
    }

    if (value.password) {
      this.authentication.password = value.password
    }

  }

  private registerValues(value) {
    if (value.email) {
      this.authentication.email = value.email
    }

    if (value.password) {
      this.authentication.password = value.password
    }

    if (value.name) {
      this.authentication.name = value.name
    }
  }


}
