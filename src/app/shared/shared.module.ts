import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { SocialButtonComponent } from './components/social-button/social-button.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalContentNicknameComponent } from './components/modal-content-nickname/modal-content-nickname.component';

@NgModule({
  declarations: [
    InputComponent, 
    ButtonComponent, 
    LoaderComponent, 
    SocialButtonComponent, 
    ModalComponent, 
    ModalContentNicknameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent, 
    ButtonComponent,
    LoaderComponent,
    SocialButtonComponent,
    ModalComponent,
    ModalContentNicknameComponent
  ]
})
export class SharedModule { }
