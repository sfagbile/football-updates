import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '../shared/league-fixture.model';
import { Subscription } from 'rxjs';
import { LeagueService } from '../shared/league.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-league-fixture',
  templateUrl: './league-fixture.component.html',
  styleUrls: ['./league-fixture.component.css']
})
export class LeagueFixtureComponent implements OnInit, OnDestroy {

  fixtures: Response[] = [];
  sub!: Subscription;
  league: number = 0;
  season: number = new Date().getFullYear();
  errorMessage: string = '';
  team: number = 0;

  constructor(private leagueService: LeagueService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.league = Number(params.get('league'));
      this.team = Number(params.get('team'));

      this.getLeagueFixtures();
    })
  }

  private getLeagueFixtures() {
    this.sub = this.leagueService.getFixtures(this.league, this.season, this.team)
      .subscribe({
        next: fixtures => {
          this.fixtures = fixtures.response;
        },
        error: err => this.errorMessage = err
      });
  }

  onBackClick() {
    this.router.navigate([`/standings/${this.league}`]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
