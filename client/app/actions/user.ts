import { Action } from '@ngrx/store';
import { DiscogsUser } from '../models';
import { type } from '../util';

export const ActionTypes = {
  LOAD:                 type('[User] Load'),
  LOAD_SUCCESS:         type('[User] Load Success'),
  LOAD_FAIL:            type('[User] Load Fail'),
};

/**
 * Load User Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload = null) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: DiscogsUser) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;
