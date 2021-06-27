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
  @Input() communityId: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('channels')
    console.log(this.communityId)
  }

  getFormValues(e) {
    this.searchName = e.content;
    this.userService.getByQuery(this.searchName, 'users').subscribe(data =>{
      this.users = data;
    })
  }

  addUserToCommunity(user) {
    
    this.userService.update({newUser : user}, this.communityId, 'adduser').subscribe(data =>{ 
      console.log(data)
    })
  }

}
