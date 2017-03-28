import * as wantlist from '../actions/wantlist';
import { DiscogsPagination, DiscogsItem } from '../models';

export interface State {
  loaded: boolean;
  loading: boolean;
  pagination: DiscogsPagination;
  wants: DiscogsItem[];
  lastAdded: Date;
  ids: number[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  pagination: { per_page: 10, items: 0, pages: 0, page: 1 },
  wants: [],
  lastAdded: null,
  ids: []
};

export function reducer(state = initialState, action: wantlist.Actions): State {
  switch (action.type) {
    case wantlist.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        wants: [],
        loading: true
      });
    }

    case wantlist.ActionTypes.LOAD_SUCCESS: {
      const discogsWantlist = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        pagination: discogsWantlist.pagination,
        wants: discogsWantlist.wants,
        lastAdded: Date.parse(discogsWantlist.wants[0].date_added)
      });
    }

    case wantlist.ActionTypes.LOAD_IDS_SUCCESS: {
      return Object.assign({}, state, {
        ids: action.payload
      });
    }

    case wantlist.ActionTypes.UPDATE_IDS: {
      return Object.assign({}, state, {
        ids: action.payload
      });
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getPage = (state: State) => state.pagination.page;

export const getWantlistIds = (state: State) => state.ids;

export const getReleases = (state: State) => {
  return {
    pagination: state.pagination,
    wants: state.wants
  };
};
