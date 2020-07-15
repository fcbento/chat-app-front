import { Component, OnInit, ViewChild } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import { Authentication } from './authentication.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  authentication = new Authentication();
  formType: boolean = true;
  titleType: any;
  disable: boolean = true;
  iconButtons: any[] = [];
  @ViewChild('input') input: InputComponent;

  constructor(private service: AuthenticationService) { }

  ngOnInit(): void {
    this.titleType = 'Sign In';

    this.iconButtons = [
      {
        buttonSocial: 'facebook-new'
      },
      {
        buttonSocial: 'google-logo'
      },
      {
        buttonSocial: 'twitter'
      }
    ];
  }

  authSocial() {

  }

  changeFormType() {
    this.input.form.reset();
    this.authentication.name = '';
    this.authentication.password = '';
    this.authentication.email = '';
    this.formType = !this.formType;
    this.formType ? this.titleType = 'Sign In' : this.titleType = 'Sign Up';
  }

  onAuth(): void {
    this.service.authentication(this.authentication.name, this.authentication.email, this.authentication.password, this.formType)
      .subscribe(data => {
        this.service.setCurrentUserValue(data);
      })
  }

  getFormValues(value) {

    if (this.formType) {
      return this.loginValues(value);

    } else {
      return this.registerValues(value);
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
