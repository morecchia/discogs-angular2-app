import * as search from '../actions/search';

import { defaults } from '../util';

import { DiscogsSearch, DiscogsSearchResult, DiscogsPagination } from '../models';

export interface State {
  searching: boolean;
  query: string;
  results: DiscogsSearchResult[];
  pagination: DiscogsPagination;
  failure: any;
};

const initialState: State = {
  searching: false,
  query: null,
  results: [],
  pagination: defaults.pagination,
  failure: null
};

export function reducer(state = initialState, action: search.Actions): State {
  switch (action.type) {
    case search.ActionTypes.SEARCH_RELEASES: {
      return Object.assign({}, state, {
        searching: true,
        query: action.payload.query
      });
    }

    case search.ActionTypes.SEARCH_COMPLETE: {
      const searchResponse = action.payload;
      return Object.assign({}, state, {
        searching: false,
        results: [...state.results, ...searchResponse.results],
        pagination: searchResponse.pagination
      });
    }

    case search.ActionTypes.SEARCH_FAIL: {
      return Object.assign({}, state, {
        searching: false,
        failure: action.payload
      });
    }

    case search.ActionTypes.CLEAR: {
      return Object.assign({}, state, {
        results: []
      });
    }

    default: {
      return state;
    }
  }
}


export const getSearching = (state: State) => state.searching;

export const getSearchFailed = (state: State) => state.failure;

export const getQuery = (state: State) => state.query;

export const getPage = (state: State) => state.pagination && state.pagination.page;

export const getSearchResults = (state: State) => {
  return {
    results: state.results,
    pagination: state.pagination
  };
};
