import { Action } from '@ngrx/store';
import { DiscogsUser, UserLogin } from '../models';
import { type } from '../util';

export const ActionTypes = {
  LOAD:                 type('[User] Load'),
  LOAD_SUCCESS:         type('[User] Load Success'),
  LOAD_FAIL:            type('[User] Load Fail'),
  LOGIN:                type('[User] Login'),
  LOGIN_FAILED:         type('[User] Login Failed'),
  LOGOUT:               type('[User] Logout'),
  AUTHORIZE_USER:       type('[User] Authorize')
};

/**
 * Load User Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: string) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: DiscogsUser) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

export class AuthorizeAction implements Action {
  type = ActionTypes.AUTHORIZE_USER;

  constructor(public payload: string) { }
}

export class LoginAction implements Action {
  type = ActionTypes.LOGIN;

  constructor(public payload: boolean) { }
}

export class LoginFailedAction implements Action {
  type = ActionTypes.LOGIN_FAILED;

  constructor(public payload: any) { }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;

  constructor(public payload = null) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | LoginAction
  | LoginFailedAction;
