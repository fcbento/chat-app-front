import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttonType: any;
  @Input() buttonColor: any
  @Input() buttonName: any;
  @Input() buttonIconName: any;

  constructor() { }

  ngOnInit(): void {

  }

}
