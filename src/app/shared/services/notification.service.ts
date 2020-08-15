import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  success() {
    this.toastr.success('Hello world!', 'Toastr fun!')
  }

  userOn(name: string) {
    this.toastr.success(`${name} is on`)
  }

  userOff(name: string) {
    this.toastr.info(`${name} has left`)
  }

  error(message: string) {
    this.toastr.error(message)
  }

  audio(fileName: string, disable: boolean) {
    if (disable) {
      let audio = new Audio()
      audio.src = `../../../assets/mp3/${fileName}.mp3`
      audio.load()
      audio.play()
    }
  }
}
