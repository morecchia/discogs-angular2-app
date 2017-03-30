import { Action } from '@ngrx/store';
import * as models from '../models';
import { type } from '../util';

export const ActionTypes = {
  INIT:          type('[Player] Init'),
  INIT_SUCCESS:  type('[Player] Init Success'),
  PLAYBACK_FAILED:     type('[Player] Playback Failed'),
  PLAY:          type('[Player] Play'),
  PLAYING:       type('[Player] Playing'),
  TOGGLE_PLAY:   type('[Player] Stop'),
  PLAYLIST_PLAY: type('[Player] Playlist Play'),
  SEEK:          type('[Player] Seek'),
  INPUT_VOL:     type('[Player] Input Volume'),
  SET_TIME:      type('[Player] Set Time'),
  GET_TIME:      type('[Player] Get Time')
};

/**
 * Load User Actions
 */
export class InitAction implements Action {
  type = ActionTypes.INIT;

  constructor(public payload = null) { }
}

export class InitSuccessAction implements Action {
  type = ActionTypes.INIT_SUCCESS;

  constructor(public payload: models.PlayerSettings) { }
}

export class InitFailAction implements Action {
  type = ActionTypes.PLAYBACK_FAILED;

  constructor(public payload: any) { }
}

export class PlayAction implements Action {
  type = ActionTypes.PLAY;

constructor(public payload: {selected: models.SelectedVideo, videos: models.SelectedVideo[]}) { }
}

export class PlayingAction implements Action {
  type = ActionTypes.PLAYING;

  constructor(public payload = null) { }
}

export class TogglePlayAction implements Action {
  type = ActionTypes.TOGGLE_PLAY;

  constructor(public payload: boolean) { }
}

export class SeekAction implements Action {
  type = ActionTypes.SEEK;

  constructor(public payload: models.StartTime) { }
}

export class VolumeInputAction implements Action {
  type = ActionTypes.INPUT_VOL;

  constructor(public payload: number) { }
}

export class GetTimeAction implements Action {
  type = ActionTypes.GET_TIME;

  constructor(public payload: models.PlayerTime) { }
}

export class SetTimeAction implements Action {
  type = ActionTypes.SET_TIME;

  constructor(public payload: models.StartTime) { }
}

export type Actions
  = InitAction
  | InitSuccessAction
  | InitFailAction
  | PlayAction
  | VolumeInputAction
  | TogglePlayAction
  | SeekAction
  | SetTimeAction
  | GetTimeAction;
