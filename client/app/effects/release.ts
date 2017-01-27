import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { DiscogsService } from '../services';
import * as release from '../actions/release';


/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 */

@Injectable()
export class ReleaseEffects {
  @Effect()
  get$: Observable<Action> = this.actions$
    .ofType(release.ActionTypes.LOAD)
    .map((action: release.LoadAction) => action.payload)
    .switchMap(id => {
      return this.discogs.getRelease(id)
        .map(response => response.json());
    });

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(release.ActionTypes.SEARCH)
    .debounceTime(300)
    .map((action: release.SearchAction) => action.payload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.ofType(release.ActionTypes.SEARCH).skip(1);

      return this.discogs.searchReleases(query)
        .takeUntil(nextSearch$)
        .map(response => new release.SearchCompleteAction(response.results))
        .catch(() => of(new release.SearchCompleteAction([])));
    });

    constructor(private actions$: Actions, private discogs: DiscogsService) { }
}
