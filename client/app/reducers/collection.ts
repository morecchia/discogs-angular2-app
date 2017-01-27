import * as collection from '../actions/collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: number[];
};

const initialState: State = {
  loaded: false,
  loading: false,
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
      const releases = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: releases.map(book => book.id)
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

export const getIds = (state: State) => state.ids;
