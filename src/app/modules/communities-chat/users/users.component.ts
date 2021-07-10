import { Component, Input, OnInit } from '@angular/core';
import { Endpoint } from '../../../shared/enums/endpoint.enum';
import { Community } from '../../../shared/models/community.interface';
import { User } from '../../../shared/models/user.interface';
import { CommunitiesService } from '../communities.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() users: User[] = [];
  @Input() community: Community;
  usersInCommunity: User[] = [];

  constructor(private service: CommunitiesService) { }
  ngOnInit(): void {
    this.getMembersInCommunity();
  }

  getMembersInCommunity() {
    this.service.getById(this.community._id, Endpoint.allMembers).subscribe(data => {
      this.usersInCommunity = data.filter(user => user.status == 2);
    });
  }

}
