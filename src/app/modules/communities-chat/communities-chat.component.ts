import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from './communities.service';

@Component({
  selector: 'app-communities-chat',
  templateUrl: './communities-chat.component.html',
  styleUrls: ['./communities-chat.component.scss']
})
export class CommunitiesChatComponent implements OnInit {

  user: any
  communities: any = []

  constructor(
    private communityService: CommunitiesService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getCommunitiesByUser();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser')) || {}
    this.user = this.user.user || {}
  }

  getCommunitiesByUser() {
    this.communityService.getById(this.user._id, 'communitybymember').subscribe((data) => {
      this.communities = data;
    })
  }

}
