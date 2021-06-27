import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../core/services/loader.service';
import { StorageService } from '../../shared/services/storage.service';
import { CommunitiesService } from './communities.service';

@Component({
  selector: 'app-communities-chat',
  templateUrl: './communities-chat.component.html',
  styleUrls: ['./communities-chat.component.scss']
})
export class CommunitiesChatComponent implements OnInit {

  user: any
  communities: any = []
  communitySelected: any;
  currentChannel: any;
  loader: boolean = false;
  userList: any = [];

  constructor(
    private communityService: CommunitiesService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getCommunitiesByUser();
    this.loadSpinner();
  }

  getUser() {
    this.user = this.storageService.getStorage('currentUser');
    this.user = this.user.user || {};
  }

  getCommunitiesByUser() {
    this.communityService.getById(this.user._id, 'communitybymember').subscribe((data) => {
      this.communities = data;
    })
  }

  selectCommunity(e: string) {
    this.communitySelected = e;
  }

  getCurrentChannel(e: HTMLObjectElement) {
    this.currentChannel = e.name;
  }

  checkWhenToShowScroll(length: number, col: string, className: string): string {

    let scrollClass: string;

    if (this.communities.length > length) {
      scrollClass = `${col} ${className} scroll`;
    } else {
      scrollClass = `${col} ${className}`;
    }

    return scrollClass;

  }

  loadSpinner() {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
    }, 2000)
  }

  getUserList(e) {
    this.userList = e;
  }

}
