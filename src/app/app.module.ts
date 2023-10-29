import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeagueStandingComponent } from './leagues/league-standing/league-standing.component';
import { LeagueFixtureComponent } from './leagues/league-fixture/league-fixture.component';
import { RouterModule } from '@angular/router';
import { LeagueRoutingModule } from './leagues/league-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CachingInterceptor } from './leagues/shared/league-cache.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LeagueStandingComponent,
    LeagueFixtureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'standings', component: LeagueStandingComponent },
      { path: '', redirectTo: 'standings', pathMatch: 'full' },
      { path: '**', redirectTo: 'standings/:id', pathMatch: 'full' },
    ]),
    LeagueRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CachingInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }