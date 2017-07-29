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
    // .startWith(new user.LoadAction('bedhed3000'))
    .mergeMap(action => {
      return this.discogs.getUser(action.payload)
        .map((userData: DiscogsUser) => {
          return new user.LoadSuccessAction(userData)
        })
        .catch(error => of(new user.LoginFailedAction(
          `Login failed for "${action.payload.username}" - ${handleError(error)}`)
        ));
    });

  @Effect()
  loginUser$ = this.actions$
    .ofType(user.ActionTypes.LOGIN)
    .mergeMap(action => {
      return this.discogs.getRequestToken()
        .map(({authorizeUrl}) => {
          return new user.AuthorizeAction(authorizeUrl);
        })
        .catch(error => of(new user.LoginFailedAction(
          `Authentication error: ${handleError(error)}`)
        ));
    });

  @Effect()
  authorizeUser$: Observable<void> = this.actions$
    .ofType(user.ActionTypes.AUTHORIZE_USER)
    .map(action => {
      window.location.href = action.payload;
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
