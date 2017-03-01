import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { go } from '@ngrx/router-store';

import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import 'rxjs/operator/map';
import 'rxjs/add/operator/mergeMap';

import { defaults } from '../util';

import * as search from '../actions/search';
import * as fromSearch from '../reducers';

import { DiscogsService } from '../services';
import { DiscogsSearch } from '../models';

interface SearchInput {
  query: string;
  page: number;
}

@Injectable()
export class SearchEffects {
  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(search.ActionTypes.SEARCH_RELEASES)
    .debounceTime(300)
    .withLatestFrom(this.store, (action, store) => {
      return {
        query: action.payload,
        page: store.search.pagination.page
      };
    })
    .switchMap((input: SearchInput) => {
      if (input.query.length < 3) {
        return [
          new search.SearchCompleteAction({results: [], pagination: defaults.pagination})
        ];
      }

      const nextSearch$ = this.actions$.ofType(search.ActionTypes.SEARCH_RELEASES).skip(1);
      const searchTerm = input.query.trim();
      const query = encodeURIComponent(searchTerm);

      return this.discogs.searchReleases(query, input.page)
        .takeUntil(nextSearch$)
        .mergeMap((response: DiscogsSearch) => [
          new search.SearchCompleteAction(response),
          go([`/search/${searchTerm}`])
        ]);
    });

  constructor(private actions$: Actions, private discogs: DiscogsService, private store: Store<fromSearch.State>) { }
}
