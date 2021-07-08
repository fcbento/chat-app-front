import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { CommunitiesService } from '../communities.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit, AfterViewInit {

  @Input() communities: any = [];
  @Input() user: any;
  @Output() selectCommunity = new EventEmitter();
  activeModal: any;
  menuItems = [
    {
      icon: 'fas fa-check',
      name: 'Accept',
      action: 'accept'
    },
    {
      icon: 'fas fa-ban',
      name: 'Decline',
      action: 'decline'
    }
  ]

  constructor(private communityService: CommunitiesService, private cdr: ChangeDetectorRef, private storageService: StorageService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.changeCommunity(this.storageService.getStorage('communitySelected'));
      this.cdr.detectChanges();
    }, 1000)
  }

  ngOnInit(): void {
  }

  changeCommunity(community) {
    this.storageService.setStorage('communitySelected', community);
    this.selectCommunity.emit(community);
  }

  modalRef(e) {
    this.activeModal = e;
  }

  acceptInvitation(community) {
    this.communityService.updateWithParams({ status: 2 }, community._id, this.user._id, 'changestatus').subscribe(data => {
      console.log(data)
    });
  }

  getAction(e, item) {
    if (e === 'accept') {
      this.acceptInvitation(item);
    }
  }

}
