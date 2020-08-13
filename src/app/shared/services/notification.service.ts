import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import audio from '../../../assets'
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

  error(message: string) {
    this.toastr.error(message)
  }

  audio(fileName: string) {
    let audio = new Audio()
    audio.src = `../../../assets/${fileName}.mp3`
    audio.load()
    audio.play()
  }
}
