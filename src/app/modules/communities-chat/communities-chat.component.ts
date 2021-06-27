import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../core/services/loader.service';
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

  constructor(
    private communityService: CommunitiesService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getCommunitiesByUser();
    this.loader = true;
    setTimeout(() =>{ 
      this.loader = false;
    }, 2000)
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser')) || {}
    this.user = this.user.user || {}
  }

  getCommunitiesByUser() {
    this.communityService.getById(this.user._id, 'communitybymember').subscribe((data) => {
      this.communities = data;
      console.log(this.communities)
    })
  }

  selectCommunity(e){
    this.communitySelected = e;
  }

  getCurrentChannel(e){
      this.currentChannel = e.name;
  }
}
