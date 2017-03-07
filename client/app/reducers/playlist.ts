import { SelectedVideo } from '../models';
import * as playlist from '../actions/playlist';

export interface State {
  loading: boolean;
  loaded: boolean;
  videos: SelectedVideo[];
};

const initialState: State = {
  loading: false,
  loaded: false,
  videos: []
};

export function reducer(state = initialState, action: playlist.Actions): State {
  switch (action.type) {
    case playlist.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case playlist.ActionTypes.LOAD_COMPLETE: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        videos: action.payload
      });
    }

    case playlist.ActionTypes.ADD: {
      return Object.assign({}, state, {
        videos: state.videos.concat(action.payload)
      });
    }

    case playlist.ActionTypes.REMOVE: {
      const videoIndex = state.videos.map(s => s.video.id).findIndex(action.payload.id);
      return Object.assign({}, state, {
        videos: state.videos.splice(videoIndex, 1)
      });
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

export const getPlaylistVideos = (state: State) => state.videos.map(s => s.video);

export const getPlaylistLoaded = (state: State) => state.loaded;

export const getPlaylistCount = (state: State) => state.videos.length;
