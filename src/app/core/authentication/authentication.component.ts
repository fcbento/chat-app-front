import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  iconButtons: any = [
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

  public form: FormGroup;
  formType: boolean = true;
  titleType: any;
  disable: boolean = true;

  loginRequest = {
    email: String,
    password: String
  };

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retype: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.titleType = 'Sign In';
  }

  authSocial() {

  }

  changeFormType() {
    this.formType = !this.formType;
    this.formType ? this.titleType = 'Sign In' : this.titleType = 'Sign Up';
  }

  onSign(): void {
    //this.showSignType ? this.onSignIn() : this.onSignUp();
  }

  onSignIn(): void {
    //this.service.signinUser(this.form.value.email, this.form.value.password)
  }

  onSignUp(): void {
    //this.service.signupUser(this.form.value.email, this.form.value.password);
  }

  getFormValues(value) {
    if (value.email) {
      this.loginRequest.email = value.email
    }

    if (value.password) {
      this.loginRequest.password = value.password
    }

    if(this.loginRequest.email !== null && this.loginRequest.password !== null){
      this.disable = false;
    }
    
  }

}
