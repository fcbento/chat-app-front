import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { StorageService } from '../../../shared/services/storage.service';
import { CommunitiesService } from '../communities.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() community: any;
  @Output() sendCurrentChannel = new EventEmitter;

  activeModal: any;
  members: any = [];
  currentPendingInvitation: any = [];
  channels: any = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public auth: AuthenticationService,
    public storageService: StorageService,
    public service: CommunitiesService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.community = changes.community.currentValue;
    this.getChannels();
  }

  ngAfterViewInit() {

    // setTimeout(() => {
    //   if (this.storageService.getStorage('channelSelected')) {
    //     this.getCurrentChannel({ name: this.storageService.getStorage('channelSelected') });
    //   } else {
    //     this.getCurrentChannel(this.channels.channels[0])
    //     this.cdr.detectChanges();
    //   }

    // }, 1000);

  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getChannels();
  }

  modalRef(e) {
    this.activeModal = e;
  }

  getCurrentChannel(currentChannel) {
    this.sendCurrentChannel.emit(currentChannel);
  }

  getCurrentUser() {
    return this.storageService.getStorage('currentUser').user;
  }

  checkCommunityOwner() {

    let isSame = false;

    if (this.getCurrentUser()._id === this.community.owner._id) {
      isSame = true;
    }

    return isSame;
  }

  getChannels() {
    this.service.getById(this.community._id, 'channels').subscribe(data => {
      this.channels = data;
    })
  }

}
