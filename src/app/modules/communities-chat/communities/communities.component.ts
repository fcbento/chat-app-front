import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Endpoint } from '../../../shared/enums/endpoint.enum';
import { ChatStorage } from '../../../shared/enums/storage.enum';
import { Community } from '../../../shared/models/community.interface';
import { Menu } from '../../../shared/models/menu.interface';
import { User } from '../../../shared/models/user.interface';
import { StorageService } from '../../../shared/services/storage.service';
import { CommunitiesService } from '../communities.service';
import { CommunitiesUtils } from '../communities.utils';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit, AfterViewInit {

  @Input() communities: Community[] = [];
  @Input() user: User;
  @Output() selectCommunity = new EventEmitter();

  activeModal: any;
  communitiesUtils = new CommunitiesUtils();
  menuItems: Menu[] = [];

  constructor(
    private communityService: CommunitiesService,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService
  ) {
    this.menuItems = this.communitiesUtils.getPendingMenuItems();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.changeCommunity(this.storageService.getStorage(ChatStorage.community));
      this.cdr.detectChanges();
    }, 1000)
  }

  ngOnInit(): void {
  }

  changeCommunity(community: Community) {
    this.storageService.setStorage(ChatStorage.community, community);
    this.selectCommunity.emit(community);
  }

  modalRef(e) {
    this.activeModal = e;
  }

  acceptInvitation(community: Community) {
    this.communityService.updateWithParams({ status: 2 }, community._id, this.user._id, Endpoint.changeStatus).subscribe(res => {});
  }

  getAction(answer: string, community: Community) {
    if (answer === 'accept') {
      this.acceptInvitation(community);
    }
  }

}
