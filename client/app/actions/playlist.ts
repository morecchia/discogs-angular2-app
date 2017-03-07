import { Action } from '@ngrx/store';
import { SelectedVideo } from '../models';
import { type } from '../util';

export const ActionTypes = {
  LOAD:          type('[Playlist] Load'),
  LOAD_COMPLETE:  type('[Playlist] Success'),
  LOAD_FAIL:     type('[Playlist] Load Fail'),
  ADD:           type('[Playlist] Add'),
  REMOVE:        type('[Playlist] Remove')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload = null) { }
}

export class LoadCompleteAction implements Action {
  type = ActionTypes.LOAD_COMPLETE;

  constructor(public payload: SelectedVideo[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: SelectedVideo[]) { }
}

export class RemoveAction implements Action {
  type = ActionTypes.REMOVE;

  constructor(public payload: SelectedVideo) { }
}

export type Actions
  = LoadAction
  | LoadCompleteAction
  | LoadFailAction
  | AddAction
  | RemoveAction;
