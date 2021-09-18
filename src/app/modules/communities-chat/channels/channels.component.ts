import { ClassField } from '@angular/compiler';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Endpoint } from '../../../shared/enums/endpoint.enum';
import { ChatStorage } from '../../../shared/enums/storage.enum';
import { Channel } from '../../../shared/models/channel.interface';
import { Community } from '../../../shared/models/community.interface';
import { Menu } from '../../../shared/models/menu.interface';
import { StorageService } from '../../../shared/services/storage.service';
import { CommunitiesService } from '../communities.service';
import { CommunitiesUtils } from '../communities.utils';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() community: Community;
  @Output() sendCurrentChannel = new EventEmitter;
  @ViewChild('addUser', { static: true }) addUser;
  @ViewChild('addChannel', { static: true }) addChannel;
  @ViewChild('deleteModal', { static: true }) deleteModal: any;

  channels: Channel[] = [];
  channelClicked: Channel;

  menuItems: Menu[] = [];
  channelMenuItems: Menu[] = [];

  type: string;
  activeModal: any;
  modalContent: any;

  communitiesUtils = new CommunitiesUtils();

  constructor(
    private cdr: ChangeDetectorRef,
    private storageService: StorageService,
    private service: CommunitiesService,
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.centered = true;
    config.keyboard = false;
    config.size = 'md';

    this.menuItems = this.communitiesUtils.getCommunityMenuItems();
    this.channelMenuItems = this.communitiesUtils.getChannelMenuItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.community = changes.community.currentValue;
    this.getChannels();
  }

  ngAfterViewInit() {

    let currentChannel: Channel = this.storageService.getStorage(ChatStorage.channel);

    setTimeout(() => {

      if (currentChannel) {
        if (this.community._id === currentChannel.community._id) {
          this.getCurrentChannel(currentChannel);
        }
        else {
          this.getCurrentChannel(this.channels[0])
          this.cdr.detectChanges();
        }
      } else {
        this.getCurrentChannel(this.channels[0])
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

  getCurrentChannel(currentChannel: Channel) {
    this.sendCurrentChannel.emit(currentChannel);
  }

  getCurrentUser() {
    return this.storageService.getStorage(ChatStorage.user).user;
  }

  checkCommunityOwner() {

    let isSame = false;

    if (this.getCurrentUser()._id === this.community.owner._id) {
      isSame = true;
    }

    return isSame;
  }

  getChannels() {
    this.service.getById(this.community._id, Endpoint.channels).subscribe(data => {
      this.channels = data;
    });
  }

  getAction(action: string, channel: Channel, type: string) {

    this.channelClicked = channel;
    this.type = type;
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
      case 'deleteCommunity':
        return this.modalContent = this.deleteModal;

      default:
        return this.modalContent = null;
    }
  }

  getItemClicked(e) {
    if (e === 'no') {
      this.modalService.dismissAll();
    } else {
      this.deleteItem();
    }
  }

  deleteItem() {
    this.service.deleteById(this.channelClicked._id, this.type === 'channel' ? Endpoint.channels : Endpoint.communities).subscribe(res => {
      if (res) {
        this.storageService.removeStorage(ChatStorage.channel);
        this.storageService.removeStorage(ChatStorage.community);
        this.modalService.dismissAll();
      }
    });
  }

}
