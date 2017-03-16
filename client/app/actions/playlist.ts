import { Action } from '@ngrx/store';
import { SelectedVideo, Playlist } from '../models';
import { type } from '../util';

export const ActionTypes = {
  LOAD:          type('[Playlist] Load'),
  LOAD_COMPLETE: type('[Playlist] Success'),
  LOAD_FAIL:     type('[Playlist] Load Fail'),
  VIEW:          type('[Playlist] View'),
  ADD:           type('[Playlist Menu] Add'),
  ADD_COMPLETE:  type('[Playlist Menu] Add Complete'),
  REMOVE:        type('[Playlist Menu] Remove'),
  ADD_VIDEOS:    type('[Playlist] Add Videos'),
  REMOVE_VIDEO:  type('[Playlist] Remove Videos')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload = null) { }
}

export class LoadCompleteAction implements Action {
  type = ActionTypes.LOAD_COMPLETE;

  constructor(public payload: Playlist[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

export class ViewAction implements Action {
  type = ActionTypes.VIEW;

  constructor(public payload: string) { }
}

export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: Playlist) { }
}

export class AddCompleteAction implements Action {
  type = ActionTypes.ADD_COMPLETE;

  constructor(public payload: Playlist[]) { }
}

export class RemoveAction implements Action {
  type = ActionTypes.REMOVE;

  constructor(public payload: Playlist) { }
}

export class AddVideosAction implements Action {
  type = ActionTypes.ADD_VIDEOS;

  constructor(public payload: {videos: SelectedVideo[], id: string}) { }
}

export class RemoveVideoAction implements Action {
  type = ActionTypes.REMOVE_VIDEO;

  constructor(public payload: SelectedVideo) { }
}

export type Actions
  = LoadAction
  | LoadCompleteAction
  | LoadFailAction
  | AddAction
  | RemoveAction
  | AddVideosAction
  | RemoveVideoAction;
