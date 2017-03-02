import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { go } from '@ngrx/router-store';

import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import 'rxjs/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import { defaults } from '../util';

import * as search from '../actions/search';
import * as fromSearch from '../reducers';

import { DiscogsService } from '../services';
import { DiscogsSearch, SearchInput } from '../models';

@Injectable()
export class SearchEffects {
  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(search.ActionTypes.SEARCH_RELEASES)
    .debounceTime(300)
    .switchMap(action => {
      if (action.payload.query.length < 3) {
        return [
          new search.SearchCompleteAction({results: [], pagination: defaults.pagination})
        ];
      }

      const nextSearch$ = this.actions$.ofType(search.ActionTypes.SEARCH_RELEASES).skip(1);
      const searchTerm = action.payload.query.trim();
      const query = encodeURIComponent(searchTerm);

      return this.discogs.searchReleases(query, action.payload.page)
        .takeUntil(nextSearch$)
        .mergeMap((response: DiscogsSearch) => [
          new search.SearchCompleteAction(response),
          go([`/search/${searchTerm}`])
        ]);
    });

  constructor(private actions$: Actions, private discogs: DiscogsService, private store: Store<fromSearch.State>) { }
}
