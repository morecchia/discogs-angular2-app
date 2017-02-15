import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';

import * as wantlist from '../actions/wantlist';
import { DiscogsService } from '../services';
import { DiscogsWants } from '../models';

@Injectable()
export class WantlistEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadWantlist$: Observable<Action> = this.actions$
    .ofType(wantlist.ActionTypes.LOAD)
    .startWith(new wantlist.LoadAction())
    .mergeMap(action => this.discogs.getListByType('wantlist', action.payload)
        .map((wants: DiscogsWants) => new wantlist.LoadSuccessAction(wants))
        .catch(error => of(new wantlist.LoadFailAction(error))));

  @Effect()
  addReleaseToWantlist$: Observable<Action> = this.actions$
    .ofType(wantlist.ActionTypes.ADD_RELEASE)
    .map((action: wantlist.AddReleaseAction) => action.payload)
    .mergeMap(release => Observable.empty());


  @Effect()
  removeReleaseFromWantlist$: Observable<Action> = this.actions$
    .ofType(wantlist.ActionTypes.REMOVE_RELEASE)
    .map((action: wantlist.RemoveReleaseAction) => action.payload)
    .mergeMap(release => Observable.empty());

  constructor(private actions$: Actions, private discogs: DiscogsService) { }
}
