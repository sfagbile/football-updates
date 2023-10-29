import { Injectable } from '@angular/core';
import { IStanding } from './league-standing.model';
import { IFixture } from './league-fixture.model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: { [key: string]: string } = {};
  private timestamps: { [key: string]: number } = {};

  get(key: string) {
    const cachedData = sessionStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  getTimestamp(key: string) {
    return this.timestamps[key] || 0;
  }

  set(key: string, value: IStanding | IFixture | null) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  setTimestamp(key: string, timestamp: number) {
    this.timestamps[key] = timestamp;
  }
}
