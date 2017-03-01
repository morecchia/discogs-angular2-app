import { Action } from '@ngrx/store';
import { DiscogsSearch, SearchInput } from '../models';
import { type } from '../util';

export const ActionTypes = {
  SEARCH_COMPLETE: type('[Search] Search Complete'),
  SEARCH_FAIL:     type('[Search] Search Fail'),
  SEARCH_RELEASES: type('[Search] Releases'),
  LOAD_RESULTS:    type('[Search] Load Results')
};

export class SearchReleasesAction implements Action {
  type = ActionTypes.SEARCH_RELEASES;

  constructor(public payload: SearchInput) { }
}

export class SearchCompleteAction implements Action {
  type = ActionTypes.SEARCH_COMPLETE;

  constructor(public payload: DiscogsSearch) { }
}

export class SearchFailAction implements Action {
  type = ActionTypes.SEARCH_FAIL;

  constructor(public payload: any) { }
}

export type Actions
  = SearchReleasesAction
  | SearchCompleteAction
  | SearchFailAction;
