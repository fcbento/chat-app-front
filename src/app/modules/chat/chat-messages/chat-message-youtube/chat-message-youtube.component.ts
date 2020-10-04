import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-message-youtube',
  templateUrl: './chat-message-youtube.component.html',
  styleUrls: ['./chat-message-youtube.component.scss']
})
export class ChatMessageYoutubeComponent implements OnInit {

  @Input() youtubeLink: string;
  embedVideo: any;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
     this.embedVideo = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.youtubeLink.split('/')[3]);
  }

}
