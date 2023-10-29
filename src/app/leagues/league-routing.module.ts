import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeagueStandingComponent } from './league-standing/league-standing.component';
import { LeagueFixtureComponent } from './league-fixture/league-fixture.component';
import { LeagueStandingGuard } from './league-standing/league-standing.guard';


@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'standings/:id',
        canActivate: [LeagueStandingGuard],
        component: LeagueStandingComponent
      },
      { path: 'fixtures', component: LeagueFixtureComponent }
    ]),
  ],
})
export class LeagueRoutingModule { }
