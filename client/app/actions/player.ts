import { Action } from '@ngrx/store';
import { YoutubeVideo } from '../models';
import { type } from '../util';

export const ActionTypes = {
  INIT:         type('[Player] Init'),
  INIT_SUCCESS: type('[Player] Init Success'),
  INIT_FAIL:    type('[Player] Init Fail'),
  PLAY:         type('[Player] Play'),
  PLAYING:      type('[Player] Playing'),
  STOP:         type('[Player] Stop'),
  RESUME:       type('[Player] Resume'),
  SEEK_FW:      type('[Player] Seek Forward'),
  SEEK_RW:      type('[Player] Seek Backward'),
  SKIP_NEXT:    type('[Player] Skip Next'),
  SKIP_PREV:    type('[Player] Skip Previous')
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

  constructor(public payload: string) { }
}

export class PlayingAction implements Action {
  type = ActionTypes.PLAYING;

  constructor(public payload: YoutubeVideo) { }
}

export class StopAction implements Action {
  type = ActionTypes.STOP;

  constructor(public payload: any) { }
}

export class ResumeAction implements Action {
  type = ActionTypes.RESUME;

  constructor(public payload = null) { }
}

export class SeekFwdAction implements Action {
  type = ActionTypes.SEEK_FW;

  constructor(public payload = null) { }
}

export class SeekRwdAction implements Action {
  type = ActionTypes.SEEK_RW;

  constructor(public payload = null) { }
}

export class SkipNextAction implements Action {
  type = ActionTypes.SKIP_NEXT;

  constructor(public payload: YoutubeVideo) { }
}

export class SkipPrevAction implements Action {
  type = ActionTypes.SKIP_PREV;

  constructor(public payload: YoutubeVideo) { }
}

export type Actions
  = InitAction
  | InitSuccessAction
  | InitFailAction
  | PlayAction
  | StopAction
  | ResumeAction
  | SeekFwdAction
  | SeekRwdAction
  | SkipNextAction
  | SkipPrevAction;
