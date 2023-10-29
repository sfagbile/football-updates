import { Component, OnDestroy, OnInit } from '@angular/core';
import { Standing } from '../shared/league-standing.model';
import { LeagueService } from '../shared/league.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { League } from '../shared/league.enum';

@Component({
  selector: 'app-league-standing',
  templateUrl: './league-standing.component.html',
  styleUrls: ['./league-standing.component.css']
})
export class LeagueStandingComponent implements OnInit, OnDestroy {

  standings: Standing[] = [];
  sub!: Subscription;
  league: number = 0;
  season: number = new Date().getFullYear();
  errorMessage: string = '';

  constructor(private leagueService: LeagueService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'))
      this.league = id == 0 ? League.PremierLeague : id;
      this.getLeagueStandings();
    })
  }

  private getLeagueStandings() {
    this.sub = this.leagueService.getStandings(this.league, this.season)
      .subscribe({
        next: standings => {
          this.standings = standings.response[0]?.league?.standings[0];
        },
        error: err => this.errorMessage = err
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
