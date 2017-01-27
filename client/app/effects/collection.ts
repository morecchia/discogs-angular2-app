import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as collection from '../actions/collection';
import { DiscogsService } from '../services';
import { DiscogsRelease } from '../models';

@Injectable()
export class CollectionEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.ActionTypes.LOAD)
    .startWith(new collection.LoadAction())
    .switchMap(() =>
      this.discogs.getListByType('collection')
        .map((releases: DiscogsRelease[]) => new collection.LoadSuccessAction(releases))
        .catch(error => of(new collection.LoadFailAction(error)))
    );

  @Effect()
  addReleaseToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ActionTypes.ADD_RELEASE)
    .map((action: collection.AddReleaseAction) => action.payload)
    .mergeMap(release => {
      return Observable.empty();
    });


  @Effect()
  removeReleaseFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.ActionTypes.REMOVE_RELEASE)
    .map((action: collection.RemoveReleaseAction) => action.payload)
    .mergeMap(release => {
      return Observable.empty();
    });

  constructor(private actions$: Actions, private discogs: DiscogsService) { }
}
