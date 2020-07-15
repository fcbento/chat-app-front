import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'chat-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() inputType: string;
  @Input() contentName: string;
  @Output() formValues = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.onCheckContentName();
  }

  onCheckContentName(): string {
    if (this.contentName) {
      return this.contentName;
    }
    return this.contentName = '';
  }

  formName(): string {
    return this.contentName.toLocaleLowerCase();
  }

  validateErrors(): boolean {
    return (this.form.get(this.formName()).hasError('minlength') && this.form.get(this.formName()).touched) ||
      (this.form.get(this.formName()).hasError('required') && this.form.get(this.formName()).touched) ||
      (this.form.get(this.formName()).hasError('pattern') && this.form.get(this.formName()).touched)
  }

  errorMessage(): string {
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
