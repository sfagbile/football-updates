import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { League } from '../shared/league.enum';

@Injectable({
  providedIn: 'root'
})
export class LeagueStandingGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = Number(route.paramMap.get('id'));
    if (isNaN(id) || id < 1) {
      alert('Invalid league id');
      this.router.navigate([`/standings/${League.PremierLeague}`]);
      return false;
    }

    if (this.isIdNotInEnum(id)){
        alert('league id does not exists');
        this.router.navigate([`/standings/${League.PremierLeague}`]);
        return false; 
    }

    return true;
  }

  private isIdNotInEnum(idToCheck: number): boolean {
    return !Object.values(League).includes(idToCheck);
  }
}
