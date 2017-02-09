import * as videos from '../actions/videos';
import { YoutubeVideo } from '../models';
export interface State {
  loaded: boolean;
  loading: boolean;
  videos: YoutubeVideo[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  videos: []
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
      return {
        loaded: true,
        loading: false,
        videos: youtubeResponse.items,
      };
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getVideoEntities = (state: State) => state.videos;
