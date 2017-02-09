import { Action } from '@ngrx/store';
import { DiscogsItem, DiscogsWants } from '../models';
import { type } from '../util';

export const ActionTypes = {
  ADD_RELEASE:             type('[Wantlist] Add Release'),
  ADD_RELEASE_SUCCESS:     type('[Wantlist] Add Release Success'),
  ADD_RELEASE_FAIL:        type('[Wantlist] Add Release Fail'),
  REMOVE_RELEASE:          type('[Wantlist] Remove Release'),
  REMOVE_RELEASE_SUCCESS:  type('[Wantlist] Remove Release Success'),
  REMOVE_RELEASE_FAIL:     type('[Wantlist] Remove Release Fail'),
  LOAD:                 type('[Wantlist] Load'),
  LOAD_SUCCESS:         type('[Wantlist] Load Success'),
  LOAD_FAIL:            type('[Wantlist] Load Fail'),
};

/**
 * Add Release to Wantlist Actions
 */
export class AddReleaseAction implements Action {
  type = ActionTypes.ADD_RELEASE;

  constructor(public payload: DiscogsItem) { }
}

export class AddReleaseSuccessAction implements Action {
  type = ActionTypes.ADD_RELEASE_SUCCESS;

  constructor(public payload: DiscogsItem) { }
}

export class AddReleaseFailAction implements Action {
  type = ActionTypes.ADD_RELEASE_FAIL;

  constructor(public payload: DiscogsItem) { }
}

/**
 * Remove Release from Collection Actions
 */
export class RemoveReleaseAction implements Action {
  type = ActionTypes.REMOVE_RELEASE;

  constructor(public payload: DiscogsItem) { }
}

export class RemoveReleaseSuccessAction implements Action {
  type = ActionTypes.REMOVE_RELEASE_SUCCESS;

  constructor(public payload: DiscogsItem) { }
}

export class RemoveReleaseFailAction implements Action {
  type = ActionTypes.REMOVE_RELEASE_FAIL;

  constructor(public payload: DiscogsItem) { }
}

/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload = 1) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: DiscogsWants) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

export type Actions
  = AddReleaseAction
  | AddReleaseSuccessAction
  | AddReleaseFailAction
  | RemoveReleaseAction
  | RemoveReleaseSuccessAction
  | RemoveReleaseFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
