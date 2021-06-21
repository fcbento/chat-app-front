import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private communityService: CommunitiesService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      
      this.changeCommunity(this.communities[0]);

      this.cdr.detectChanges();
    }, 1000)
  }

  ngOnInit(): void {
  }

  addNewCommunity() {
    this.communityService.create({ name: 'JavaScript', owner: this.user }, 'communities').subscribe((data) => {
    })
  }

  changeCommunity(community) {
    this.selectCommunity.emit(community);
  }

  modalRef(e) {
    this.activeModal = e;
  }

}
