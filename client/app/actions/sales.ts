import { Action } from '@ngrx/store';
import { DiscogsSales } from '../models';
import { type } from '../util';

export const ActionTypes = {
  LOAD:                 type('[Sales] Load'),
  LOAD_SUCCESS:         type('[Sales] Load Success'),
  LOAD_FAIL:            type('[Sales] Load Fail'),
};

/**
 * Load Sales Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload = 1) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: {list: DiscogsSales, cached: boolean}) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;
