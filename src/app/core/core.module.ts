import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})

export class CoreModule { }
