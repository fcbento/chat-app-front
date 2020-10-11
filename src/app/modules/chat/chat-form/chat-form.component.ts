import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatService } from '../chat.service';
import * as RecordRTC from 'recordrtc';
import { timer } from 'rxjs';
import { data } from 'jquery';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
})
export class ChatFormComponent implements OnInit {

  message: any;
  activeModal: any;
  title = 'micRecorder';
  record: any;
  recording = false;
  url: any
  error: any;
  counter;
  timeLeft: number = 0;
  audioFile: any;

  constructor(
    private chatService: ChatService,
    private domSanitizer: DomSanitizer
  ) { }

  initiateRecording() {

    this.recording = true;
    this.timeLeft = 0
    clearInterval(this.counter)
    this.startTimer()

    let mediaConstraints = {
      video: false,
      audio: true
    };

    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this),
        this.errorCallback.bind(this));

  }

  successCallback(stream) {

    let options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 50000,
    };

    let StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.recording = false;
    clearInterval(this.counter)
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob) {
    this.audioFile = blob;
    let reader = new FileReader();
    reader.onload =  () => {
      let dataUrl = reader.result;
      let k = dataUrl.toString()
      let base64 = k.split(',')[1];
      this.audioFile = base64
    };
    reader.readAsDataURL(blob);
    this.url = URL.createObjectURL(blob);
    this.sendAudioMessage();
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit(): void {

  }

  onSendMessage() {
    this.chatService.emit('createMessage', { text: this.message, isYoutube: false })
    this.message = ''
  }

  triggerFunction(event) {
    if (event.ctrlKey && event.key === 'Enter') {
      let text = document.getElementById("txtarea");
      text['value'] += '\n';
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.onSendMessage();
    }
  }

  getLink(e) {
    this.chatService.emit('createMessage', { text: e, isYoutube: true, isAudio: false })
    this.activeModal.close()
  }

  sendAudioMessage() {
    this.chatService.emit('createMessage',
      {
        text: this.url,
        isYoutube: false,
        isAudio: true,
        audioFile: this.audioFile
      }
    )
  }

  modalRef(e) {
    this.activeModal = e;
  }

  startTimer() {
    this.counter = setInterval(() => {
      if (this.timeLeft >= 0) {
        this.timeLeft++;
      } else {
        this.timeLeft = 60;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.counter);
  }
}
