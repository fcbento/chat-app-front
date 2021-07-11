import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../../core/services/loader.service';
import { Endpoint } from '../../shared/enums/endpoint.enum';
import { ChatStorage } from '../../shared/enums/storage.enum';
import { Channel } from '../../shared/models/channel.interface';
import { Community } from '../../shared/models/community.interface';
import { User } from '../../shared/models/user.interface';
import { StorageService } from '../../shared/services/storage.service';
import { CommunitiesService } from './communities.service';

@Component({
  selector: 'app-communities-chat',
  templateUrl: './communities-chat.component.html',
  styleUrls: ['./communities-chat.component.scss']
})
export class CommunitiesChatComponent implements OnInit {

  user: User;
  communities: Community[] = [];
  communitySelected: Community;
  currentChannel: Channel;
  loader: boolean = false;
  userList: User[] = [];
  isProfile: boolean = false;

  constructor(
    private communityService: CommunitiesService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getCommunitiesByUser();
    this.loadSpinner();

    setTimeout(() => {
      this.setUserOnline();
    }, 1000)
  }

  getUser() {
    const { user, token } = this.storageService.getStorage(ChatStorage.user);
    this.user = user;
    this.user.token = token;
  }

  getCommunitiesByUser() {
    this.communityService.getById(this.user._id, Endpoint.byMember).subscribe((res: Community[]) => {
      this.communities = res;
    });
  }

  selectCommunity(community: Community) {
    this.communitySelected = community;
  }

  getCurrentChannel(channel: Channel) {
    this.currentChannel = channel;
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

  setUserOnline() {
    const communityId = this.communitySelected ? this.communitySelected._id : this.storageService.getStorage(ChatStorage.community)._id;
    this.communityService.updateWithParams({ status: true }, communityId, this.user._id, Endpoint.userOn).subscribe(data => { })
  }

  getUserList(user: User[]) {
    this.userList = user;
  }
  
  editUser(e) {
    this.isProfile = e;
  }

  editUserCancel(e){
    this.isProfile = e;
  }

}
