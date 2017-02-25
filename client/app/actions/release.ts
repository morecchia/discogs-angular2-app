import { Action } from '@ngrx/store';
import { DiscogsRelease, DiscogsSearchResult } from '../models';
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
  LOAD_COMPLETE:  type('[Release] Load Complete'),
  LOAD_FAIL:      type('[Release] Load Fail'),
  LOAD:           type('[Release] Load'),
  LOAD_PLAYER:    type('[Release] Load Player'),
  PLAY_RELEASE:   type('[Release] Play Release')
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

  constructor(public payload: string) { }
}

export class LoadCompleteAction implements Action {
  type = ActionTypes.LOAD_COMPLETE;

  constructor(public payload: DiscogsRelease) { }
}

export class LoadPlayerAction implements Action {
  type = ActionTypes.LOAD_PLAYER;

  constructor(public payload: number) { }
}

export class PlayReleaseAction implements Action {
  type = ActionTypes.PLAY_RELEASE;

  constructor(public payload: DiscogsRelease) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction
  | LoadCompleteAction
  | LoadPlayerAction
  | PlayReleaseAction
  | LoadFailAction;
