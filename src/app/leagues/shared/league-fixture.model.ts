export interface IFixture {
    get:        string;
    parameters: Parameters;
    results:    number;
    paging:     Paging;
    response:   Response[];
}

export interface Paging {
    current: number;
    total:   number;
}

export interface Parameters {
    league: string;
    team:   string;
    last:   string;
}

export interface Response {
    fixture: Fixture;
    league:  League;
    teams:   Teams;
    goals:   Goals;
    score:   Score;
}

export interface Fixture {
    id:        number;
    referee:   string;
    timezone:  Timezone;
    date:      Date;
    timestamp: number;
    periods:   Periods;
    venue:     Venue;
    status:    Status;
}

export interface Periods {
    first:  number;
    second: number;
}

export interface Status {
    long:    Long;
    short:   Short;
    elapsed: number;
}

export enum Long {
    MatchFinished = "Match Finished",
}

export enum Short {
    Ft = "FT",
}

export enum Timezone {
    UTC = "UTC",
}

export interface Venue {
    id:   number;
    name: string;
    city: City;
}

export enum City {
    BournemouthDorset = "Bournemouth, Dorset",
    Liverpool = "Liverpool",
    London = "London",
}

export interface Goals {
    home:  number;
    away: number;
}

export interface Teams{
    home: Team,
    away: Team
}

export interface Team {
    id:     number;
    name:   string;
    logo:   string;
    winner: boolean;
}

export interface League {
    id:      number;
    name:    Name;
    country: Country;
    logo:    string;
    flag:    string;
    season:  number;
    round:   string;
}

export enum Country {
    England = "England",
}

export enum Name {
    PremierLeague = "Premier League",
}

export interface Score {
    halftime:  Goals;
    fulltime:  Goals;
    extratime: Goals;
    penalty:   Goals;
}
