import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttonType: any;
  @Input() buttonSize: any;
  @Input() buttonColor: any
  @Input() buttonName: any;
  @Input() buttonSocial: any;
  @Input() buttonIconSize: any;

  btnOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.onConverBtnSize();
    this.setBtnStyle();
    this.setSocialIcon();
  }

  onConverBtnSize(): string {
    if (this.buttonSize) {
      return this.buttonSize = `${parseInt(this.buttonSize)}%`;
    }
  }

  setBtnStyle() {

    this.btnOptions = {
      width: this.buttonSize,
      backgroundColor: this.buttonColor,
      borderColor: this.buttonColor
    }

  }

  setSocialIcon() {
    this.buttonSocial = `https://img.icons8.com/color/${this.buttonIconSize}/000000/${this.buttonSocial}.png`;
  }

}
