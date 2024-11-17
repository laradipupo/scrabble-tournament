import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  mappedData: { name: string; totalScore: number; gamesPlayed: number }[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMappedData().subscribe((data) => {
      this.mappedData = data;
    });
  }

}
