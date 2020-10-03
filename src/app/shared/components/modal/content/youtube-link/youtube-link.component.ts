import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-youtube-link',
  templateUrl: './youtube-link.component.html',
  styleUrls: ['./youtube-link.component.scss']
})
export class YoutubeLinkComponent implements OnInit {

  @Output() youtubeLink = new EventEmitter();
  link: any;

  constructor() { }

  ngOnInit(): void {
  }

  sendYoutube() {
    this.youtubeLink.emit(this.link)
  }

}
