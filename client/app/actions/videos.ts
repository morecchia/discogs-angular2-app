import { Action } from '@ngrx/store';
import { YoutubeResponse, SelectedVideo } from '../models';
import { type } from '../util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  LOAD_COMPLETE:      type('[Videos] Load Complete'),
  LOAD_FAIL:          type('[Videos] Load Fail'),
  LOAD:               type('[Videos] Load'),
  SELECTED:           type('[Video] Selected'),
  PLAYLIST_SELECTED:  type('[Video] Playlist Selected'),
  CLEAR:              type('[Videos] Cleared')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: string[]) { }
}

export class LoadCompleteAction implements Action {
  type = ActionTypes.LOAD_COMPLETE;

  constructor(public payload: YoutubeResponse) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

export class SelectedAction implements Action {
  type = ActionTypes.SELECTED;

  constructor(public payload: SelectedVideo) { }
}

export class ClearAction implements Action {
  type = ActionTypes.CLEAR;
    constructor(public payload = null) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction
  | LoadCompleteAction
  | LoadFailAction
  | SelectedAction
  | ClearAction;
