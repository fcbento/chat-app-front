import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  rooms:any = [
    {
      "id": "1",
      "name": "English",
      "country": "USA"
    },
    {
      "id": "2",
      "name": "Spanish",
      "country": "Spain"
    },
    {
      "id": "3",
      "name": "French",
      "country": "France"
    },
    {
      "id": "4",
      "name": "German",
      "country": "Germany"
    },
    {
      "id": "5",
      "name": "Italian",
      "country": "Italy"
    },
    {
      "id": "6",
      "name": "Portuguese",
      "country": "Portugal"
    },
    {
      "id": "7",
      "name": "Japanese",
      "country": "Japan"
    },
    {
      "id": "8",
      "name": "Chinese",
      "country": "China"
    },
    {
      "id": "9",
      "name": "Russian",
      "country": "Russia"
    }
  ];

  flag: any;

  constructor(private router: Router, public roomService: RoomService) {
  }

  ngOnInit(): void {
    this.getCountriesByName();
  }

  getCountriesByName(){
    for(let room of this.rooms) {
      this.roomService.getByQuery(room.country).subscribe(data => {
       room.flag = data.map(country => country.flag)[0]; 
      })
    }
   }

  goChat(room) {
    localStorage.setItem('room', JSON.stringify(room));
    this.router.navigateByUrl('/chat');
  }

}
