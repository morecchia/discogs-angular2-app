import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as user from '../actions/user';
import { DiscogsService } from '../services';
import { DiscogsUser } from '../models';

@Injectable()
export class UserEffects {
  @Effect()
  loadUser$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.LOAD)
    .startWith(new user.LoadAction())
    .mergeMap(() =>
      this.discogs.getUser()
        .map((identity: DiscogsUser) => new user.LoadSuccessAction(identity))
        .catch(error => of(new user.LoadFailAction(error)))
      );

  constructor(private actions$: Actions, private discogs: DiscogsService) { }
}
