import * as collection from '../actions/collection';
import { DiscogsPagination, DiscogsItem } from '../models';
export interface State {
  loaded: boolean;
  loading: boolean;
  pagination: DiscogsPagination;
  releases: DiscogsItem[];
  ids: number[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  pagination: { per_page: 10, items: 0, pages: 0, page: 1 },
  releases: [],
  ids: []
};

export function reducer(state = initialState, action: collection.Actions): State {
  switch (action.type) {
    case collection.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case collection.ActionTypes.LOAD_SUCCESS: {
      const discogsCollection = action.payload;

      return {
        loaded: true,
        loading: false,
        pagination: discogsCollection.pagination,
        releases: discogsCollection.releases,
        ids: discogsCollection.releases.map(release => release.id)
      };
    }

    case collection.ActionTypes.ADD_RELEASE_SUCCESS:
    case collection.ActionTypes.REMOVE_RELEASE_FAIL: {
      const release = action.payload;

      if (state.ids.indexOf(release.id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [...state.ids, release.id]
      });
    }

    case collection.ActionTypes.REMOVE_RELEASE_SUCCESS:
    case collection.ActionTypes.ADD_RELEASE_FAIL: {
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
  return {pagination: state.pagination, releases: state.releases }
};
