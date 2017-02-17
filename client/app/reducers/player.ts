import { YoutubeVideo, DiscogsRelease } from '../models';
import * as player from '../actions/player';

export interface State {
  initialized: boolean;
  playing: boolean;
  ids: string[];
  nextId: string | null;
  prevId: string | null;
  video: YoutubeVideo;
  volume: number;
  release: DiscogsRelease;
  timeFormatted: string;
  timeSeconds: number;
};

const initialState: State = {
  initialized: false,
  playing: false,
  ids: [],
  video: null,
  release: null,
  nextId: null,
  prevId: null,
  volume: 50,
  timeFormatted: '0:00',
  timeSeconds: 0
};

export function reducer(state = initialState, action: player.Actions): State {
  switch (action.type) {
    case player.ActionTypes.INIT: {
      return Object.assign({}, state, {
        ids: action.payload.map(v => v.id)
      });
    }

    case player.ActionTypes.PLAY: {
      return Object.assign({}, state, {
        initialized: true,
        video: action.payload.video,
        release: action.payload.release
      });
    }

    case player.ActionTypes.PLAYING: {
      const prevNextIds = _getPrevNextIds(state.ids, action.payload);
      return Object.assign({}, state, {
        playing: true,
        video: action.payload,
        nextId: prevNextIds.next,
        prevId: prevNextIds.prev
      });
    }

    case player.ActionTypes.STOP: {
      return Object.assign({}, state, {
        playing: false
      });
    }

    case player.ActionTypes.RESUME: {
      return Object.assign({}, state, {
        playing: true
      });
    }

    case player.ActionTypes.SET_TIME: {
      return Object.assign({}, state, {
        timeFormatted: action.payload.formatted,
        timeSeconds: action.payload.seconds
      });
    }

    default: {
      return state;
    }
  }
}

function _getPrevNextIds(ids: string[], selectedVideo: YoutubeVideo) {
  const currentIndex = ids.indexOf(selectedVideo.id);

  return {
    prev: ids[currentIndex - 1] || null,
    next: ids[currentIndex + 1] || null
  };
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

export const getPlayingRelease = (state: State) => state.release;

export const getPlayerVideo = (state: State) => state.video;

export const getPlayerTime = (state: State) => {
  return {
    formatted: state.timeFormatted,
    seconds: state.timeSeconds
  };
};

export const getNextVideoId = (state: State) => state.nextId;

export const getPlayerInitialized = (state: State) => state.initialized;
