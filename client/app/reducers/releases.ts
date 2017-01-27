import { createSelector } from 'reselect';
import { DiscogsRelease } from '../models/release';
import * as release from '../actions/release';
import * as collection from '../actions/collection';

export interface State {
  ids: number[];
  entities: { [id: number]: DiscogsRelease };
  selectedReleaseId: number | null;
};

const initialState: State = {
  ids: [],
  entities: {},
  selectedReleaseId: null,
};

export function reducer(state = initialState, action: release.Actions | collection.Actions): State {
  switch (action.type) {
    case release.ActionTypes.SEARCH_COMPLETE:
    case collection.ActionTypes.LOAD_SUCCESS: {
      const releases = action.payload;
      const newreleases = releases.filter(release => !state.entities[release.id]);

      const newreleaseIds = newreleases.map(release => release.id);
      const newReleaseEntities = newreleases.reduce((entities: { [id: string]: DiscogsRelease }, release: DiscogsRelease) => {
        return Object.assign(entities, {
          [release.id]: release
        });
      }, {});

      return {
        ids: [ ...state.ids, ...newreleaseIds ],
        entities: Object.assign({}, state.entities, newReleaseEntities),
        selectedReleaseId: state.selectedReleaseId
      };
    }

    case release.ActionTypes.LOAD: {
      const release = action.payload;

      if (state.ids.indexOf(release.id) > -1) {
        return state;
      }

      return {
        ids: [ ...state.ids, release.id ],
        entities: Object.assign({}, state.entities, {
          [release.id]: release
        }),
        selectedReleaseId: state.selectedReleaseId
      };
    }

    case release.ActionTypes.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedReleaseId: action.payload
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

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedReleaseId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
