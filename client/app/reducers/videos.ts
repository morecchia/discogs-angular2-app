import * as videos from '../actions/videos';
import { YoutubeVideo } from '../models';
export interface State {
  loaded: boolean;
  loading: boolean;
  videos: YoutubeVideo[];
  selected: YoutubeVideo;
};

const initialState: State = {
  loaded: false,
  loading: false,
  videos: [],
  selected: null
};

export function reducer(state = initialState, action: videos.Actions): State {
  switch (action.type) {
    case videos.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case videos.ActionTypes.LOAD_COMPLETE: {
      const youtubeResponse = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        videos: youtubeResponse.items,
      });
    }

    case videos.ActionTypes.SELECTED: {
      return Object.assign({}, state, {
        selected: action.payload.video
      });
    }

    case videos.ActionTypes.CLEAR: {
      return Object.assign({}, state, {
        videos: [],
        loading: false,
        loaded: false
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getVideoEntities = (state: State) => state.videos;

export const getSelectedVideo = (state: State) => state.selected;

export const getSelectedId = (state: State) => state.selected && state.selected.id;
