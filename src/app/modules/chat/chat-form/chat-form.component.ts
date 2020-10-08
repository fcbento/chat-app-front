import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatService } from '../chat.service';
import * as RecordRTC from 'recordrtc';

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

  constructor(
    private chatService: ChatService,
    private domSanitizer: DomSanitizer
  ) { }

  initiateRecording() {
    this.recording = true;
    
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
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob) {
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
    this.chatService.emit('createMessage', { text: this.url, isYoutube: false, isAudio: true })
  }

  modalRef(e) {
    this.activeModal = e;
  }

}
