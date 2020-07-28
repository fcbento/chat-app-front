import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'chat-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() inputType: string;
  @Input() inputName: string;
  @Input() inputIcon: string;
  @Output() formValues = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nickname: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.onCheckinputName();
  }

  onCheckinputName(): string {
    if (this.inputName) {
      return this.inputName;
    }
    return this.inputName = '';
  }

  formName(): string {
    return this.inputName.toLocaleLowerCase();
  }

  validateErrors(): boolean {
    return (this.form.get(this.formName()).hasError('minlength') && this.form.get(this.formName()).touched) 
        || (this.form.get(this.formName()).hasError('required') && this.form.get(this.formName()).touched) 
        || (this.form.get(this.formName()).hasError('pattern') && this.form.get(this.formName()).touched)
  }

  errorMessage(): string {
    
    if (this.form.get(this.formName()).hasError('required') && this.form.get(this.formName()).touched) {
      return `${this.formName().charAt(0).toUpperCase() + this.formName().slice(1)} is required`
    }

    if (this.form.get(this.formName()).hasError('minlength') && this.form.get(this.formName()).touched) {
      return 'Min is 6'
    }

    if (this.form.get(this.formName()).hasError('pattern') && this.form.get(this.formName()).touched) {
      return 'Email is invalid'
    }
  }

  sendFormValue(){
    this.formValues.emit(this.form.value)
  }
}
