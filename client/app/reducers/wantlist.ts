import * as wantlist from '../actions/wantlist';
import { DiscogsPagination, DiscogsItem } from '../models';
export interface State {
  loaded: boolean;
  loading: boolean;
  pagination: DiscogsPagination;
  wants: DiscogsItem[];
  ids: number[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  pagination: { per_page: 10, items: 0, pages: 0, page: 1 },
  wants: [],
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
      return {
        loaded: true,
        loading: false,
        pagination: discogsWantlist.pagination,
        wants: discogsWantlist.wants,
        ids: discogsWantlist.wants.map(release => release.id)
      };
    }

    case wantlist.ActionTypes.ADD_RELEASE_SUCCESS:
    case wantlist.ActionTypes.REMOVE_RELEASE_FAIL: {
      const release = action.payload;

      if (state.ids.indexOf(release.id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [...state.ids, release.id]
      });
    }

    case wantlist.ActionTypes.REMOVE_RELEASE_SUCCESS:
    case wantlist.ActionTypes.ADD_RELEASE_FAIL: {
      const release = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== release.id)
      });
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getReleases = (state: State) => {
  return {
    pagination: state.pagination,
    wants: state.wants
  };
};
