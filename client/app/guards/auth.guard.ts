import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { DiscogsService } from '../services/discogs.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor( private discogs: DiscogsService, private router: Router ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const loggedInUser = this.discogs.getLoggedInUser();
    if (loggedInUser !== null) {
      return true;
    }
    this.router.navigate(['/login']);
  }
}
