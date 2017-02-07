import * as user from '../actions/user';
import { DiscogsUser } from '../models';

export interface State {
  loading: boolean;
  loaded: boolean;
  user: DiscogsUser;
};

const initialState: State = {
  loading: true,
  loaded: false,
  user: new DiscogsUser()
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case user.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case user.ActionTypes.LOAD_SUCCESS: {
      return {
        loaded: true,
        loading: false,
        user: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getUser = (state: State) => state.user;
