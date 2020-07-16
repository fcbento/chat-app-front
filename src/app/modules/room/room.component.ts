import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  rooms = [
    {
      "id": "1",
      "name": "English ESL"
    },
    {
      "id": "2",
      "name": "JavaScript"
    },
    {
      "id": "3",
      "name": "18-32"
    },
    {
      "id": "4",
      "name": "Dating"
    },
    {
      "id": "6",
      "name": "Node"
    },
    {
      "id": "7",
      "name": "Sports"
    },
    {
      "id": "9",
      "name": "HTML/CSS/JS"
    },
    {
      "id": "10",
      "name": "UX"
    },
    {
      "id": "11",
      "name": "Chemistry"
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goChat(room) {
    localStorage.setItem('room', JSON.stringify(room));
    this.router.navigateByUrl('/chat');
  }

}
