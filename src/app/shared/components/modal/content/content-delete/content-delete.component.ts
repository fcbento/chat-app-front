import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-content-delete',
  templateUrl: './content-delete.component.html',
  styleUrls: ['./content-delete.component.scss']
})
export class ContentDeleteComponent implements OnInit {

  @Output() sendItemClicked = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  itemClicked(answer: string) {
    this.sendItemClicked.emit(answer);
  }

}
