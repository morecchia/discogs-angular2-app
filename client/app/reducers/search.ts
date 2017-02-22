import * as search from '../actions/search';
import { DiscogsSearch, DiscogsSearchResult, DiscogsPagination } from '../models';
export interface State {
  searching: boolean;
  query: string;
  results: DiscogsSearchResult[];
  pagination: DiscogsPagination;
};

const initialState: State = {
  searching: false,
  query: null,
  results: [],
  pagination: { per_page: 10, items: 0, pages: 0, page: 1 },
};

export function reducer(state = initialState, action: search.Actions): State {
  switch (action.type) {
    case search.ActionTypes.SEARCH_RELEASES: {
      const searchState =  Object.assign({}, state, {
        searching: true,
        query: action.payload
      });
      console.log(searchState);
      return searchState;
    }

    case search.ActionTypes.SEARCH_COMPLETE: {
      const searchResponse = action.payload;
      const completeState = Object.assign({}, state, {
        searching: false,
        results: searchResponse.results,
        pagination: searchResponse.pagination
      });
      console.log(completeState);
      return completeState;
    }

    default: {
      return state;
    }
  }
}


export const getSearching = (state: State) => state.searching;

export const getQuery = (state: State) => state.query;

export const getSearchResults = (state: State) => {
  return {
    results: state.results,
    pagination: state.pagination
  };
};
