import * as user from '../actions/user';
import { DiscogsUser } from '../models';

export interface State {
  loading: boolean;
  loaded: boolean;
  user: DiscogsUser;
  loggedIn: boolean;
  failed: any;
};

const initialState: State = {
  loading: true,
  loaded: false,
  user: null,
  loggedIn: false,
  failed: null
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case user.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case user.ActionTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        loggedIn: true,
        user: action.payload
      });
    }

    case user.ActionTypes.LOGIN: {
      return Object.assign({}, state, {
        loggedIn: true,
        failed: null
      });
    }

    case user.ActionTypes.LOGIN_FAILED: {
      return Object.assign({}, state, {
        loggedIn: false,
        failed: action.payload
      });
    }

    case user.ActionTypes.LOGOUT: {
      return Object.assign({}, state, {
        user: null,
        loggedIn: false
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getUser = (state: State) => state.user;

export const getLoginFailed = (state: State) => state.failed;

export const getLoggedIn = (state: State) => state.loggedIn;
