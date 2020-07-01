import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() inputType: string;
  @Input() inputSize: any;
  @Input() contentName: string;

  constructor() { }

  ngOnInit(): void {
    this.onCheckContentName();
    this.onConverInputSize();
  }

  getIcon(): string {
    if (this.onCheckContentName()) {
      let iconName = this.contentName.toLocaleLowerCase();
      return `icon__${iconName}`
    }
  }

  onCheckContentName(): string {
    if (this.contentName) {
      return this.contentName;
    }
    return this.contentName = '';
  }

  onConverInputSize() {
    if (this.inputSize) {
      return this.inputSize =`${parseInt(this.inputSize)}%`;
    }
  }
}
