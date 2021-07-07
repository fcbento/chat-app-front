import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../../../core/services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  searchName: string;
  users: any = [];
  @Input() community: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getFormValues(e) {
    this.searchName = e.content;
    this.userService.getByQuery(this.searchName, 'users').subscribe(data => {
      this.users = data;
    })
  }

  addUserToCommunity(user) {

    this.userService.create({ user: user, community: this.community, status: 1 }, 'addmember').subscribe(data => {
      console.log(data)
    });
  }

}
