import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ]
})

export class CoreModule { }
