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

  value: any;

  constructor() { }

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

  sendFormValue(value) {
    this.formValues.emit({ type: this.formName(), content: value.target.value })
  }
}
