import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { go } from '@ngrx/router-store';

import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import 'rxjs/operator/map';
import 'rxjs/add/operator/mergeMap';

import * as search from '../actions/search';
import { DiscogsService } from '../services';
import { DiscogsSearch } from '../models';

@Injectable()
export class SearchEffects {
  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(search.ActionTypes.SEARCH_RELEASES)
    .debounceTime(300)
    .switchMap((action: search.SearchReleasesAction) => {
      if (action.payload.query.length < 3) {
        return of({});
      }

      const nextSearch$ = this.actions$.ofType(search.ActionTypes.SEARCH_RELEASES).skip(1);

      return this.discogs.searchReleases(action.payload.query, action.payload.page)
        .takeUntil(nextSearch$)
        .mergeMap((response: DiscogsSearch) => [
          new search.SearchCompleteAction(response),
          go([`/search/${action.payload.query}`])
        ]);
    });

  constructor(private actions$: Actions, private discogs: DiscogsService) { }
}
