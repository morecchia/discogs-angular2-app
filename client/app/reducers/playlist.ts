import { Playlist } from '../models';
import * as playlist from '../actions/playlist';

export interface State {
  loading: boolean;
  loaded: boolean;
  currentId: string;
  playlists: Playlist[];
};

const initialState: State = {
  loading: false,
  loaded: false,
  currentId: null,
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
          newPlaylist.count = newPlaylist.count + action.payload.videos.length;
          newPlaylist.videos = playlist.videos.concat(action.payload.videos);
        }
        return newPlaylist;
      });
      return Object.assign({}, state, {
        playlists: updatedPlaylists
      });
    }

    case playlist.ActionTypes.REMOVE_VIDEO: {
      const removeFromPlaylist = state.playlists.find(p => p.id === action.payload.playlistId);
      const updatedPlaylists = state.playlists.filter(p => p.id !== removeFromPlaylist.id);
      const videoIndex = removeFromPlaylist.videos.map(s => s.video.id).findIndex(action.payload.id);
      removeFromPlaylist.videos = removeFromPlaylist.videos.splice(videoIndex, 1);
      updatedPlaylists.push(removeFromPlaylist);
      return Object.assign({}, state, {
        playlists: updatedPlaylists
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

export const getCurrentId = (state: State) => state.currentId;

export const getPlaylistsLoaded = (state: State) => state.loaded;

export const getPlaylistsLoading = (state: State) => state.loading;
