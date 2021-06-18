import { Component, Input, OnInit } from '@angular/core';
import { CommunitiesService } from '../communities.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {

  @Input() communities: any = [];
  @Input() user: any;

  constructor(private communityService: CommunitiesService) { }

  ngOnInit(): void {
    
  }

  addNewCommunity(){
    this.communityService.create({name: 'JavaScript', owner: this.user}, 'communities').subscribe((data) => {
      console.log(data)
    })
  }

}
