import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chat-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {
  
  @Input() imageUploaded;

  constructor() { }

  ngOnInit(): void {
  }

  removeImage() {
    this.imageUploaded = null;
  }

}
