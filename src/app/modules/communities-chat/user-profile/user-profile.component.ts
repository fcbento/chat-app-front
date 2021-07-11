import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Endpoint } from '../../../shared/enums/endpoint.enum';
import { ChatStorage } from '../../../shared/enums/storage.enum';
import { User } from '../../../shared/models/user.interface';
import { StorageService } from '../../../shared/services/storage.service';
import { CommunitiesService } from '../communities.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() user: User;
  @Output() cancelEditUser = new EventEmitter();

  imageUpload: any;
  userReq: any = {}

  constructor(private service: CommunitiesService, private storageService: StorageService) { }

  ngOnInit(): void {

  }

  getImage(image) {
    this.imageUpload = image;
    console.log(this.imageUpload);
  }

  editInfo() {
    let user: any = {}

    if (this.userReq.name) {
      user.name = this.userReq.name;
    } else {
      user.name = this.user.name
    }

    if (this.userReq.email) {
      user.email = this.userReq.email;
    } else {
      user.email = this.user.email;
    }

    user.avatar = this.imageUpload;

    this.service.update(user, this.user._id, Endpoint.user).subscribe(res => {

      const newUser = {
        token: this.user.token,
        user: res
      }

      this.storageService.setStorage(ChatStorage.user, newUser);
    })
  }

  getFormValues(value) {
    if (value.type === "email")
      this.userReq.email = value.content;

    if (value.type === "name")
      this.userReq.name = value.content;
  }

  cancelEdition() {
    this.cancelEditUser.emit(false);
  }

}
