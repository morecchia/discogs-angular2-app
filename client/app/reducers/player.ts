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
  currentTime: number;
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
  currentTime: 0
};

export function reducer(state = initialState, action: player.Actions): State {
  switch (action.type) {
    case player.ActionTypes.INIT: {
      const ids = action.payload.map(v => v.id);
      return Object.assign({}, state, {
        ids: ids
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
        initialized: true,
        playing: true,
        video: action.payload,
        nextId: prevNextIds.next,
        prevId: prevNextIds.prev
      });
    }

    case player.ActionTypes.SKIP_NEXT: {
      const prevNextIds = _getPrevNextIds(state.ids, state.video);
      return Object.assign({}, state, {
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

export const getPlayerInitialized = (state: State) => state.initialized;
