import { Component, Input, OnInit } from '@angular/core';
import { CommunitiesService } from '../../../../../modules/communities-chat/communities.service';

@Component({
  selector: 'app-new-community',
  templateUrl: './new-community.component.html',
  styleUrls: ['./new-community.component.scss']
})
export class NewCommunityComponent implements OnInit {

  @Input() user: any;

  newCommunity: any = {};

  constructor(public communityService: CommunitiesService) { }

  ngOnInit(): void {
  }

  getFormValues(value: any) {

    if (value.type === 'name') {
      this.newCommunity.name = value.content;
    }

    if (value.type.includes('logo')) {
      this.newCommunity.logo = value.content;
    }

  }

  createNewCommunity(){
    const community = {
      owner: this.user,
      name: this.newCommunity.name,
      logo: this.newCommunity.logo
    }
    this.communityService.create(community, 'communities').subscribe(data => {
      console.log(data);
    })
  }

}
