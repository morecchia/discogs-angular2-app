import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

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
        .map((response: DiscogsSearch) => new search.SearchCompleteAction(response))
        .catch(err => of(new search.SearchFailAction(err)));
    });

  constructor(private actions$: Actions, private discogs: DiscogsService) { }
}
