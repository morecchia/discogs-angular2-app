import { YoutubeVideo, DiscogsRelease } from '../models';
import * as player from '../actions/player';

export interface State {
  initialized: boolean;
  playing: boolean;
  current: YoutubeVideo;
  volume: number;
  release: DiscogsRelease;
  timeFormatted: string;
  timeSeconds: number;
  failure: any;
};

const initialState: State = {
  initialized: false,
  playing: false,
  current: null,
  release: null,
  volume: 50,
  timeFormatted: '0:00',
  timeSeconds: 0,
  failure: null
};

export function reducer(state = initialState, action: player.Actions): State {
  switch (action.type) {
    case player.ActionTypes.INIT: {
      return Object.assign({}, state, {
        initialized: true
      });
    }

    case player.ActionTypes.INIT_SUCCESS: {
      return Object.assign({}, state, {
        volume: action.payload.volume,
        current: action.payload.activeVideo && action.payload.activeVideo.video,
        release: action.payload.activeVideo && action.payload.activeVideo.release
      });
    }

    case player.ActionTypes.PLAY: {
      return Object.assign({}, state, {
        current: action.payload.video,
        release: action.payload.release
      });
    }

    case player.ActionTypes.PLAYBACK_FAILED: {
      return Object.assign({}, state, {
        failure: action.payload
      });
    }

    case player.ActionTypes.PLAYING: {
      return Object.assign({}, state, {
        playing: true
      });
    }

    case player.ActionTypes.PLAYLIST_PLAY: {
      return Object.assign({}, state, {
        current: action.payload.video,
        release: action.payload.release
      });
    }

    case player.ActionTypes.TOGGLE_PLAY: {
      return Object.assign({}, state, {
        playing: action.payload,
      });
    }

    case player.ActionTypes.GET_TIME: {
      return Object.assign({}, state, {
        timeFormatted: action.payload.formatted,
        timeSeconds: action.payload.seconds
      });
    }

    case player.ActionTypes.INPUT_VOL: {
      return Object.assign({}, state, {
        volume: action.payload
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

export const getPlayerInitialized = (state: State) => state.initialized;

export const getPlayerFailed = (state: State) => state.failure;

export const getPlaying = (state: State) => state.playing;

export const getPlayingRelease = (state: State) => state.release;

export const getPlayerCurrent = (state: State) => state.current;

export const getPlayerCurrentId = (state: State) => state.current && state.current.id;

export const getPlayerVolume = (state: State) => state.volume;

export const getPlayerTime = (state: State) => {
  return {
    formatted: state.timeFormatted,
    seconds: state.timeSeconds
  };
};
