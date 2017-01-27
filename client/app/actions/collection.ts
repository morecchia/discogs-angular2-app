import { Action } from '@ngrx/store';
import { DiscogsRelease } from '../models';
import { type } from '../util';

export const ActionTypes = {
  ADD_RELEASE:             type('[Collection] Add Release'),
  ADD_RELEASE_SUCCESS:     type('[Collection] Add Release Success'),
  ADD_RELEASE_FAIL:        type('[Collection] Add Release Fail'),
  REMOVE_RELEASE:          type('[Collection] Remove Release'),
  REMOVE_RELEASE_SUCCESS:  type('[Collection] Remove Release Success'),
  REMOVE_RELEASE_FAIL:     type('[Collection] Remove Release Fail'),
  LOAD:                 type('[Collection] Load'),
  LOAD_SUCCESS:         type('[Collection] Load Success'),
  LOAD_FAIL:            type('[Collection] Load Fail'),
};


/**
 * Add Release to Collection Actions
 */
export class AddReleaseAction implements Action {
  type = ActionTypes.ADD_RELEASE;

  constructor(public payload: DiscogsRelease) { }
}

export class AddReleaseSuccessAction implements Action {
  type = ActionTypes.ADD_RELEASE_SUCCESS;

  constructor(public payload: DiscogsRelease) { }
}

export class AddReleaseFailAction implements Action {
  type = ActionTypes.ADD_RELEASE_FAIL;

  constructor(public payload: DiscogsRelease) { }
}


/**
 * Remove Release from Collection Actions
 */
export class RemoveReleaseAction implements Action {
  type = ActionTypes.REMOVE_RELEASE;

  constructor(public payload: DiscogsRelease) { }
}

export class RemoveReleaseSuccessAction implements Action {
  type = ActionTypes.REMOVE_RELEASE_SUCCESS;

  constructor(public payload: DiscogsRelease) { }
}

export class RemoveReleaseFailAction implements Action {
  type = ActionTypes.REMOVE_RELEASE_FAIL;

  constructor(public payload: DiscogsRelease) { }
}

/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  public payload: any;
  type = ActionTypes.LOAD;

  constructor() { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: DiscogsRelease[]) { }
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
