import { YoutubeVideo } from '../models';
import * as player from '../actions/player';

export interface State {
  initialized: boolean;
  playing: boolean;
  video: YoutubeVideo;
};

const initialState: State = {
  initialized: false,
  playing: false,
  video: null,
};

export function reducer(state = initialState, action: player.Actions): State {
  switch (action.type) {
    case player.ActionTypes.INIT_SUCCESS: {
      return Object.assign(state, {
        initialized: true
      });
    }

    case player.ActionTypes.INIT: {
      return {
        initialized: false,
        playing: false,
        video: action.payload
      };
    }

    case player.ActionTypes.PLAYING: {
      return {
        initialized: true,
        playing: true,
        video: action.payload
      };
    }

    case player.ActionTypes.STOP: {
      return Object.assign(state, {
        playing: false
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

export const getPlaying = (state: State) => state.playing;

export const getPlayerVideo = (state: State) => state.video;

export const getPlayerInitialized = (state: State) => state.initialized;
