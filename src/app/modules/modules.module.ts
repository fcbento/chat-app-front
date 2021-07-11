import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { ModulesRoutingModule } from './modules-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommunitiesChatComponent } from './communities-chat/communities-chat.component';
import { CommunitiesComponent } from './communities-chat/communities/communities.component';
import { ChannelsComponent } from './communities-chat/channels/channels.component';
import { UsersComponent } from './communities-chat/users/users.component';
import { UserProfileComponent } from './communities-chat/user-profile/user-profile.component';

@NgModule({
  declarations: [RoomComponent, CommunitiesChatComponent, CommunitiesComponent,ChatComponent, ChannelsComponent, UsersComponent, UserProfileComponent],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ModulesModule { }
