import { YoutubeVideo, DiscogsRelease } from '../models';
import * as player from '../actions/player';

export interface State {
  initialized: boolean;
  playing: boolean;
  next: YoutubeVideo | null;
  prev: YoutubeVideo | null;
  video: YoutubeVideo;
  videos: YoutubeVideo[];
  volume: number;
  release: DiscogsRelease;
  timeFormatted: string;
  timeSeconds: number;
};

const initialState: State = {
  initialized: false,
  playing: false,
  video: null,
  videos: [],
  release: null,
  next: null,
  prev: null,
  volume: 50,
  timeFormatted: '0:00',
  timeSeconds: 0
};

export function reducer(state = initialState, action: player.Actions): State {
  switch (action.type) {
    case player.ActionTypes.INIT: {
      const videos = action.payload;
      return Object.assign({}, state, {
        videos: videos,
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
      const prevNextVideos = _getPrevNextVideos(state.videos, action.payload);
      return Object.assign({}, state, {
        playing: true,
        video: action.payload,
        next: prevNextVideos.next,
        prev: prevNextVideos.prev
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

    case player.ActionTypes.GET_TIME: {
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

function _getPrevNextVideos(videos: YoutubeVideo[], selectedVideo: YoutubeVideo) {
  const currentIndex = videos.map(v => v.id).indexOf(selectedVideo.id);
  return {
    prev: videos[currentIndex - 1] || null,
    next: videos[currentIndex + 1] || null
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

export const getPlayerInitialized = (state: State) => state.initialized;

export const getPlaying = (state: State) => state.playing;

export const getPlayingRelease = (state: State) => state.release;

export const getPlayerVideo = (state: State) => state.video;

export const getPlayerVideos = (state: State) => state.videos;

export const getPlayerTime = (state: State) => {
  return {
    formatted: state.timeFormatted,
    seconds: state.timeSeconds
  };
};

export const getPrevNextVideos = (state: State) => {
  return {
    prev: state.prev,
    next: state.next
  };
};
