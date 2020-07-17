import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
    { path: 'room', component: RoomComponent },
    { path: 'chat', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
