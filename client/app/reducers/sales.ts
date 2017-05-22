import * as sales from '../actions/sales';
import { DiscogsPagination, DiscogsListing } from '../models';
export interface State {
  loaded: boolean;
  loading: boolean;
  pagination: DiscogsPagination;
  listings: DiscogsListing[];
  ids: number[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  pagination: { per_page: 10, items: 0, pages: 0, page: 1 },
  listings: [],
  ids: []
};

export function reducer(state = initialState, action: sales.Actions): State {
  switch (action.type) {
    case sales.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case sales.ActionTypes.LOAD_SUCCESS: {
      const discogsSales = action.payload.list;
      return {
        loaded: true,
        loading: false,
        pagination: discogsSales.pagination,
        listings: action.payload.cached ? state.listings : [...state.listings, ...discogsSales.listings],
        ids: discogsSales.listings && discogsSales.listings.map(listing => listing.release.id)
      };
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getPage = (state: State) => state.pagination && state.pagination.page;

export const getListings = (state: State) => {
  return {
    pagination: state.pagination,
    listings: state.listings
  };
};
