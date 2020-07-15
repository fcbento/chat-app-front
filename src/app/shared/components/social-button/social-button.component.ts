import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.scss']
})
export class SocialButtonComponent implements OnInit {

  @Input() socialName: any;

  constructor() { }

  ngOnInit(): void {
  }

}
