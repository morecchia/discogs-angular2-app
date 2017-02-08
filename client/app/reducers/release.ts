import { DiscogsItem, DiscogsRelease } from '../models';
import * as release from '../actions/release';
import * as collection from '../actions/collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  id: number | null;
  entity: DiscogsRelease;
};

const initialState: State = {
  loaded: false,
  loading: false,
  id: null,
  entity: null,
};

export function reducer(state = initialState, action: release.Actions): State {
  switch (action.type) {
    case release.ActionTypes.LOAD_COMPLETE: {
      const release = action.payload;

      return {
        loaded: true,
        loading: false,
        id: release.id,
        entity: release,
      };
    }

    case release.ActionTypes.LOAD: {
      return {
        loaded: false,
        loading: true,
        id: action.payload,
        entity: state.entity,
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getReleaseEntity = (state: State) => state.entity;

export const getReleaseId = (state: State) => state.id;
