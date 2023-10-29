import { Component } from '@angular/core';
import { League } from './leagues/shared/league.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'FOOTBALL UPDATES';
  england: number = League.PremierLeague
  spain: number = League.LaLiga
  germany: number = League.Bundesliga
  france: number = League.Ligue1
  italy: number = League.SerieA
}
