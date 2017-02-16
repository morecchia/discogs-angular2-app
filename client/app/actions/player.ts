import { Action } from '@ngrx/store';
import { YoutubeVideo, DiscogsRelease } from '../models';
import { type } from '../util';

export const ActionTypes = {
  INIT:         type('[Player] Init'),
  INIT_SUCCESS: type('[Player] Init Success'),
  INIT_FAIL:    type('[Player] Init Fail'),
  PLAY:         type('[Player] Play'),
  PLAYING:      type('[Player] Playing'),
  STOP:         type('[Player] Stop'),
  RESUME:       type('[Player] Resume'),
  SEEK:         type('[Player] Seek'),
  SET_VOL:      type('[Player] Set Volume'),
  INPUT_VOL:    type('[Player] Input Volume'),
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

  constructor(public payload: string) { }
}

export class InitFailAction implements Action {
  type = ActionTypes.INIT_FAIL;

  constructor(public payload: any) { }
}

export class PlayAction implements Action {
  type = ActionTypes.PLAY;

  constructor(public payload: { video: YoutubeVideo, release: DiscogsRelease }) { }
}

export class PlayingAction implements Action {
  type = ActionTypes.PLAYING;

  constructor(public payload: YoutubeVideo) { }
}

export class StopAction implements Action {
  type = ActionTypes.STOP;

  constructor(public payload: any = null) { }
}

export class ResumeAction implements Action {
  type = ActionTypes.RESUME;

  constructor(public payload = null) { }
}

export class SeekAction implements Action {
  type = ActionTypes.SEEK;

  constructor(public payload = null) { }
}

export class VolumeInputAction implements Action {
  type = ActionTypes.INPUT_VOL;

  constructor(public payload: number) { }
}

export class VolumeSetAction implements Action {
  type = ActionTypes.SET_VOL;

  constructor(public payload: number) { }
}

export type Actions
  = InitAction
  | InitSuccessAction
  | InitFailAction
  | PlayAction
  | StopAction
  | ResumeAction
  | SeekAction;
