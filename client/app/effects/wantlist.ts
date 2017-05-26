import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import { LocalStorageService } from 'angular-2-local-storage';

import * as wantlist from '../actions/wantlist';
import * as fromWantlist from '../reducers';

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
    .withLatestFrom(this.store, (action, state) => {
      return {
        action,
        wantlist: {
          wants: state.wantlist.wants,
          pagination: state.wantlist.pagination
        }
      };
    })
    .switchMap(state => this.discogs.getListByType('wantlist', state.action.payload, state.wantlist)
        .map((result: {list: DiscogsWants, cached: boolean}) => new wantlist.LoadSuccessAction(result))
        .catch(error => of(new wantlist.LoadFailAction(error.json()))));

  @Effect()
  afterLoad$: Observable<Action> = this.actions$
    .ofType(wantlist.ActionTypes.LOAD_SUCCESS)
    .map(action =>
      new wantlist.LoadIdsAction(action.payload.list.pagination
        && action.payload.list.pagination.items));

  @Effect()
  addReleaseToWantlist$: Observable<Action> = this.actions$
    .ofType(wantlist.ActionTypes.ADD_RELEASE)
    .mergeMap(action =>
      this.discogs.putWantlist(action.payload.id)
        .map(response => {
          const stored_ids = this.localStorage.get('wantlist_ids') as number[];
          const update = {
            ids: [...stored_ids, response.id],
            lastUpdated: Date.now()
          };
          this.discogs.updateWantlistIds(update);
          return new wantlist.UpdateIdsAction(update.ids);
        })
    );

  @Effect()
  removeReleaseFromWantlist$: Observable<Action> = this.actions$
    .ofType(wantlist.ActionTypes.REMOVE_RELEASE)
    .mergeMap(action =>
      this.discogs.deleteWantlist(action.payload.id)
        .map(response => {
          const stored_ids = this.localStorage.get('wantlist_ids') as number[];
          const update = {
            ids: stored_ids.filter(id => id !== action.payload.id),
            lastUpdated: Date.now()
          };
          this.discogs.updateWantlistIds(update);
          return new wantlist.UpdateIdsAction(update.ids);
        })
    );

  @Effect()
  allWantlistIds$ = this.actions$
    .ofType(wantlist.ActionTypes.LOAD_IDS)
    .withLatestFrom(this.store, (action, store) => {
      return {action, lastAdded: store.wantlist.lastAdded};
    })
    .mergeMap(state =>
      this.discogs.getWantlistIds(state.action.payload, state.lastAdded)
        .map(response => {
          this.discogs.updateWantlistIds(response);
          return new wantlist.LoadIdsSuccessAction(response.ids);
        }));

  @Effect()
  afterUpdate$ = this.actions$
    .ofType(wantlist.ActionTypes.UPDATE_IDS)
    .withLatestFrom(this.store, (action, store) =>
      store.wantlist.pagination && store.wantlist.pagination.page)
    .map(page => new wantlist.LoadAction(page));

  constructor(private actions$: Actions, private store: Store<fromWantlist.State>,
    private discogs: DiscogsService, private localStorage: LocalStorageService) { }
}
