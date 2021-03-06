import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import * as fromCollection from '../reducers';
import * as collection from '../actions/collection';
import { DiscogsService } from '../services';
import { DiscogsItem, DiscogsCollection } from '../models';

@Injectable()
export class CollectionEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.ActionTypes.LOAD)
    .withLatestFrom(this.store, (action, state) => {
      return {
        action,
        collection: {
          collection: state.collection.releases,
          pagination: state.collection.pagination
        }
      };
    })
    .switchMap(state =>
      this.discogs.getListByType('collection', state.action.payload, state.collection)
        .map((result: {list: DiscogsCollection, cached: boolean}) => new collection.LoadSuccessAction(result))
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

  constructor(private actions$: Actions, private store: Store<fromCollection.State>, private discogs: DiscogsService) { }
}
