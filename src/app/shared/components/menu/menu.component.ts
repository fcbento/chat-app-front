import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  showMenu: boolean = false;
  @Input() data;
  @Input() items: any = [];
  @Output() sendAction = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  openMenu() {
    this.showMenu = !this.showMenu;
  }

  ngOnDestroy(): void {
    this.showMenu = false;
  }

  getAction(action) {
    this.sendAction.emit(action);
  }

}
