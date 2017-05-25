import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AuthGuard implements CanActivateChild {
  loggedInUser: string;

  constructor( private localStorage: LocalStorageService, private router: Router ) {
    this.loggedInUser = localStorage.get('discogs-user') as string;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loggedInUser) {
      return true;
    }

    this.router.navigate(['/login']);
  }
}
