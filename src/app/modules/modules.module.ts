import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { ModulesRoutingModule } from './modules-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RoomComponent, ChatComponent],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ModulesModule { }
