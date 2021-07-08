import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
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
  @ViewChild('addUser', { static: true }) addUser;
  @ViewChild('addChannel', { static: true }) addChannel;
  @ViewChild('deleteChannel', { static: true }) deleteChannel: any;

  activeModal: any;
  members: any = [];
  currentPendingInvitation: any = [];
  channels: any = [];
  modalContent: any;

  menuItems: any = [
    {
      icon: 'fas fa-cog',
      name: 'Settings',
      action: 'settings'
    },
    {
      icon: 'fas fa-user-plus',
      name: 'User',
      action: 'addUser'
    },
    {
      icon: 'fas fa-folder-plus',
      name: 'Channel',
      action: 'addChannel'
    },
    {
      icon: 'fas fa-trash-alt',
      name: 'Remove',
      action: 'removeCommunity'
    }
  ]

  channelMenuItems: any = [
    {
      icon: 'fas fa-cog',
      name: 'Edit',
      action: 'edit'
    },
    {
      icon: 'fas fa-trash-alt',
      name: 'Delete',
      action: 'deleteChannel'
    }
  ]

  constructor(
    private cdr: ChangeDetectorRef,
    private auth: AuthenticationService,
    private storageService: StorageService,
    private service: CommunitiesService,
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.centered = true;
    config.keyboard = false;
    config.size = 'md'
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.community = changes.community.currentValue;
    this.getChannels();
  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (this.storageService.getStorage('channelSelected')) {
        this.getCurrentChannel({ name: this.storageService.getStorage('channelSelected') });
      } else {
        this.getCurrentChannel(this.channels.channels[0])
        this.cdr.detectChanges();
      }

    }, 1000);

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

  getAction(action: string) {
    this.selectAction(action);
    if (this.modalContent) {
      this.modalService.open(this.modalContent);
    }
  }

  selectAction(action: string): string {
    switch (action) {

      case 'addUser':
        return this.modalContent = this.addUser;

      case 'addChannel':
        return this.modalContent = this.addChannel;
        
      case 'deleteChannel':
        return this.modalContent = this.deleteChannel;

      default:
        return this.modalContent = null;
    }
  }

}
