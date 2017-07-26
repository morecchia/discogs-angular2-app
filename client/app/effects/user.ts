import { Injectable, Compiler } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as user from '../actions/user';
import * as fromUser from '../reducers';

import { handleError } from '../util';
import { DiscogsService } from '../services';
import { DiscogsUser } from '../models';

@Injectable()
export class UserEffects {
  @Effect()
  loadUser$ = this.actions$
    .ofType(user.ActionTypes.LOAD)
    .startWith(new user.LoadAction({username: this.discogs.getLoggedInUser(), rememberMe: false}))
    .mergeMap(action => {
      if (!action.payload || !action.payload.username) {
        return of({});
      }
      return this.discogs.getUser(action.payload.username)
        .map((identity: DiscogsUser) => {
          this.router.navigate(['/']);
          return new user.LoadSuccessAction(identity)
        })
        .catch(error => of(new user.LoginFailedAction(
          `Login failed for "${action.payload.username}" - ${handleError(error)}`)
        ));
    });

  @Effect()
  loginUser$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.LOGIN)
    .map(action => {
      this.discogs.storeUsername(action.payload);
      return new user.LoadAction(action.payload);
    });

  @Effect()
  logoutUser$ = this.actions$
    .ofType(user.ActionTypes.LOGOUT)
    .map(action => {
      this.clearCache();
      return of({});
    });

  @Effect()
  loginFailed$ = this.actions$
    .ofType(user.ActionTypes.LOGIN_FAILED)
    .map(action => {
      this.clearCache();
      return of({});
    });

  private clearCache() {
    this.compiler.clearCache();
    this.discogs.clearStorage();
  }

  constructor(private actions$: Actions, private discogs: DiscogsService, private router: Router,
    private store: Store<fromUser.State>, private compiler: Compiler) { }
}
