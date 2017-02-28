import { Action } from '@ngrx/store';
import { YoutubeVideo, DiscogsRelease, PlayerTime, SelectedVideo } from '../models';
import { type } from '../util';

export const ActionTypes = {
  INIT:         type('[Player] Init'),
  INIT_SUCCESS: type('[Player] Init Success'),
  INIT_FAIL:    type('[Player] Init Fail'),
  PLAY:         type('[Player] Play'),
  PLAYING:      type('[Player] Playing'),
  LOAD_VIDEOS:  type('[Player] Load Videos'),
  TOGGLE_PLAY:  type('[Player] Stop'),
  SEEK:         type('[Player] Seek'),
  INPUT_VOL:    type('[Player] Input Volume'),
  SET_TIME:     type('[Player] Set Time'),
  GET_TIME:     type('[Player] Get Time')
};

/**
 * Load User Actions
 */
export class InitAction implements Action {
  type = ActionTypes.INIT;

  constructor(public payload: YoutubeVideo[]) { }
}

export class InitSuccessAction implements Action {
  type = ActionTypes.INIT_SUCCESS;

  constructor(public payload: number) { }
}

export class InitFailAction implements Action {
  type = ActionTypes.INIT_FAIL;

  constructor(public payload: any) { }
}

export class PlayAction implements Action {
  type = ActionTypes.PLAY;

  constructor(public payload: SelectedVideo) { }
}

export class PlayingAction implements Action {
  type = ActionTypes.PLAYING;

  constructor(public payload: YoutubeVideo) { }
}

export class LoadVideosAction implements Action {
  type = ActionTypes.LOAD_VIDEOS;

  constructor(public payload: {videos: YoutubeVideo[], release: DiscogsRelease}) { }
}

export class TogglePlay implements Action {
  type = ActionTypes.TOGGLE_PLAY;

  constructor(public payload: number) { }
}

export class SeekAction implements Action {
  type = ActionTypes.SEEK;

  constructor(public payload: {duration: string, startTime: number}) { }
}

export class VolumeInputAction implements Action {
  type = ActionTypes.INPUT_VOL;

  constructor(public payload: number) { }
}

export class GetTimeAction implements Action {
  type = ActionTypes.GET_TIME;

  constructor(public payload: PlayerTime) { }
}

export class SetTimeAction implements Action {
  type = ActionTypes.SET_TIME;

  constructor(public payload: {duration: string, startTime: number}) { }
}

export type Actions
  = InitAction
  | InitSuccessAction
  | InitFailAction
  | PlayAction
  | LoadVideosAction
  | VolumeInputAction
  | StopAction
  | ResumeAction
  | SeekAction
  | SetTimeAction
  | GetTimeAction;
