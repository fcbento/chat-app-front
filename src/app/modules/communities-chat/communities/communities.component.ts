import { AfterContentChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommunitiesService } from '../communities.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {

  @Input() communities: any = [];
  @Input() user: any;
  @Output() selectCommunity = new EventEmitter();
  activeModal: any;
  
  constructor(private communityService: CommunitiesService) { }

  ngOnInit(): void {
    console.log(this.communities)
  }

  addNewCommunity() {
    this.communityService.create({ name: 'JavaScript', owner: this.user }, 'communities').subscribe((data) => {
      console.log(data)
    })
  }

  changeCommunity(community) {
    this.selectCommunity.emit(community);
  }

  modalRef(e) {
    this.activeModal = e;
  }

}
