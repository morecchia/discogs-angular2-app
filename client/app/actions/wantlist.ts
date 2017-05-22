import { Action } from '@ngrx/store';
import { DiscogsItem, DiscogsWants, DiscogsRelease } from '../models';
import { type } from '../util';

export const ActionTypes = {
  ADD_RELEASE:            type('[Wantlist] Add Release'),
  ADD_RELEASE_FAIL:       type('[Wantlist] Add Release Fail'),
  REMOVE_RELEASE:         type('[Wantlist] Remove Release'),
  REMOVE_RELEASE_FAIL:    type('[Wantlist] Remove Release Fail'),
  LOAD:                   type('[Wantlist] Load'),
  LOAD_SUCCESS:           type('[Wantlist] Load Success'),
  LOAD_FAIL:              type('[Wantlist] Load Fail'),
  LOAD_IDS:               type('[Wantlist] Load Ids'),
  LOAD_IDS_SUCCESS:       type('[Wantlist] Load Ids Success'),
  UPDATE_IDS:             type('[Wantlist] Update Ids')
};

/**
 * Add Release to Wantlist Actions
 */
export class AddReleaseAction implements Action {
  type = ActionTypes.ADD_RELEASE;

  constructor(public payload: DiscogsRelease) { }
}

export class AddReleaseFailAction implements Action {
  type = ActionTypes.ADD_RELEASE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Remove Release from Wantlist Actions
 */
export class RemoveReleaseAction implements Action {
  type = ActionTypes.REMOVE_RELEASE;

  constructor(public payload: DiscogsRelease) { }
}

export class RemoveReleaseFailAction implements Action {
  type = ActionTypes.REMOVE_RELEASE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Load Wantlist Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload = 1) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: {list: DiscogsWants, cached: boolean}) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

export class LoadIdsAction implements Action {
  type = ActionTypes.LOAD_IDS;

  constructor(public payload: number) { }
}

export class LoadIdsSuccessAction implements Action {
  type = ActionTypes.LOAD_IDS_SUCCESS;

  constructor(public payload: number[]) { }
}

export class UpdateIdsAction implements Action {
  type = ActionTypes.UPDATE_IDS;

  constructor(public payload: number[]) { }
}

export type Actions
  = AddReleaseAction
  | AddReleaseFailAction
  | RemoveReleaseAction
  | RemoveReleaseFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | LoadIdsAction
  | LoadIdsSuccessAction
  | UpdateIdsAction;
