import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  success() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  error() {
    this.toastr.error('Something is not right', 'Error')
  }
}
