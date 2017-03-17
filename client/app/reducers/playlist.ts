import { Playlist } from '../models';
import * as playlist from '../actions/playlist';

export interface State {
  loading: boolean;
  loaded: boolean;
  current: Playlist;
  playlists: Playlist[];
};

const initialState: State = {
  loading: false,
  loaded: false,
  current: null,
  playlists: []
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
        playlists: action.payload
      });
    }

    case playlist.ActionTypes.ADD_COMPLETE: {
      return Object.assign({}, state, {
        playlists: action.payload
      });
    }

    case playlist.ActionTypes.REMOVE: {
      const playlistIndex = state.playlists.map(s => s.id).findIndex(action.payload.id);
      return Object.assign({}, state, {
        playlists: state.playlists.splice(playlistIndex, 1)
      });
    }

    case playlist.ActionTypes.ADD_VIDEOS: {
      const updatedPlaylists = state.playlists.map(playlist => {
        const newPlaylist =  Object.assign({}, playlist);
        if (playlist.id === action.payload.id) {
          newPlaylist.videos = playlist.videos.concat(action.payload.videos);
          newPlaylist.count = newPlaylist.videos.length;
        }
        return newPlaylist;
      });
      return Object.assign({}, state, {
        playlists: updatedPlaylists
      });
    }

    case playlist.ActionTypes.REMOVE_VIDEO: {
      const videoIndex = state.current.videos
        .map(s => s.video.id)
        .indexOf(action.payload.video.id);

      const updatedPlaylists = state.playlists.map(playlist => {
        const newPlaylist =  Object.assign({}, playlist);
        if (playlist.id === state.current.id) {
          const newVideos = newPlaylist.videos.slice(0);
          newVideos.splice(videoIndex, 1);
          newPlaylist.videos = newVideos;
          newPlaylist.count = newPlaylist.videos.length;
        }
        return newPlaylist;
      });

      const updatedCurrent = updatedPlaylists
        .find(p => p.id === state.current.id);

      return Object.assign({}, state, {
        current: updatedCurrent,
        playlists: updatedPlaylists
      });
    }

    case playlist.ActionTypes.VIEW: {
      const selected = state.playlists.find(p => p.id === action.payload);
      return Object.assign({}, state, {
        current: selected
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

export const getPlaylists = (state: State) => state.playlists;

export const getCurrent = (state: State) => state.current;

export const getPlaylistsLoaded = (state: State) => state.loaded;

export const getPlaylistsLoading = (state: State) => state.loading;
