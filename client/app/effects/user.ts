import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as user from '../actions/user';
import * as fromUser from '../reducers';

import { DiscogsService } from '../services';
import { DiscogsUser } from '../models';

@Injectable()
export class UserEffects {
  @Effect()
  loadUser$ = this.actions$
    .ofType(user.ActionTypes.LOAD)
    .startWith(new user.LoadAction())
    .mergeMap(action => {
      if (!this.discogs.loggedInUser) {
        return of({});
      }
      return this.discogs.getUser(this.discogs.loggedInUser)
        .map((identity: DiscogsUser) => new user.LoadSuccessAction(identity))
        .catch(error => of(new user.LoginFailedAction(
          `Login failed for "${this.discogs.loggedInUser}" - ${error.json().message}`)
        ));
    });

  @Effect()
  loginUser$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.LOGIN)
    .map(action => {
      this.discogs.storeUsername(action.payload);
      return new user.LoadAction();
    });

  @Effect()
  logoutUser$ = this.actions$
    .ofType(user.ActionTypes.LOGOUT)
    .map(action => {
      this.discogs.clearUsername();
      return of({});
    });

  constructor(private actions$: Actions, private discogs: DiscogsService, private store: Store<fromUser.State>) { }
}
