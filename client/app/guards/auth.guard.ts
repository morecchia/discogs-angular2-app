import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { DiscogsService } from '../services/discogs.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const loggedInUser: string = route.queryParams['username'];
    if (loggedInUser) {
      return true;
    }
    this.router.navigate(['/login']);
  }
}
