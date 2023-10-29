import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { IStanding } from './league-standing.model';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFixture } from './league-fixture.model';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private baseUrl = environment.API_BASE_URL;
  headers!: HttpHeaders;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders({
      'x-rapidapi-host': environment.API_HOST,
      'x-rapidapi-key': environment.API_KEY
    });
  }

  getStandings(league: number, season: number): Observable<IStanding> {
    const endpoint = `${this.baseUrl}/standings?league=${league}&season=${season}`;
    return this.http.get<IStanding>(endpoint, { headers: this.headers })
      .pipe(shareReplay(1),
        catchError(this.handleError)
      );
  }

  getFixtures(league: number, season: number, team: number): Observable<IFixture> {
    const endpoint = `${this.baseUrl}/fixtures?league=${league}&season=${season}&team=${team}&last=10`;
    return this.http.get<IFixture>(endpoint, { headers: this.headers })
      .pipe(shareReplay(1),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
