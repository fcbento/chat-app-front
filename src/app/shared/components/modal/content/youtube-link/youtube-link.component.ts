import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-youtube-link',
  templateUrl: './youtube-link.component.html',
  styleUrls: ['./youtube-link.component.scss']
})
export class YoutubeLinkComponent implements OnInit {

  @Output() youtubeLink = new EventEmitter();
  link: any;
  isYoutubeLink: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  sendYoutube() {
    this.youtubeLink.emit(this.link)
  }

  validateYoutubeLink() {

    if (this.validate()) {
      this.isYoutubeLink = true;
    } else {
      this.isYoutubeLink = false;
    }
  }

  validate() {
    let p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (this.link.match(p)) {
      return this.link.match(p)[1];
    }
    return false;
  }

}
