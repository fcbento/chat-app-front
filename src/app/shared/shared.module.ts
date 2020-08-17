import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { SocialButtonComponent } from './components/social-button/social-button.component';
import { ModalComponent } from './components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChatComponent } from '../modules/chat/chat.component';
import { ChatUsersComponent } from '../modules/chat/chat-users/chat-users.component';
import { ChatFormComponent } from '../modules/chat/chat-form/chat-form.component';
import { ChatMessagesComponent } from '../modules/chat/chat-messages/chat-messages.component';

@NgModule({
  declarations: [
    InputComponent, 
    ButtonComponent, 
    LoaderComponent, 
    SocialButtonComponent, 
    ModalComponent,
    ChatComponent,
    ChatUsersComponent, 
    ChatFormComponent, 
    ChatMessagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  exports: [
    InputComponent, 
    ButtonComponent,
    LoaderComponent,
    SocialButtonComponent,
    ModalComponent,
    ChatComponent,
    ChatUsersComponent, 
    ChatFormComponent, 
    ChatMessagesComponent
  ]
})
export class SharedModule { }
