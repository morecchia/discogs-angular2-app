import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import { LocalStorageService } from 'angular-2-local-storage';

import * as moment from 'moment';

import * as player from '../actions/player';
import { YoutubeService, formatDuration } from '../services/youtube.service';
import { YoutubeVideo } from '../models';

@Injectable()
export class PlayerEffects {
  @Effect()
  initPlayer$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.INIT)
    .map(action => {
      this.youtube.initPlayer(action.payload);
      return new player.InitSuccessAction(action.payload);
    });

  @Effect()
  playVideo$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.PLAY)
    .map(action => {
      this.youtube.player.loadVideoById(action.payload.video.id);
      return new player.PlayingAction(action.payload.video);
    });

  @Effect()
  setTime$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SET_TIME)
    .switchMap(action =>
      this.youtube.playerTime(action.payload)
        .map(time => new player.GetTimeAction(time))
    );

  @Effect()
  stopVideo$ = this.actions$
    .ofType(player.ActionTypes.STOP)
    .map(action => {
      this.youtube.player.pauseVideo();
      return of({});
    });

  @Effect()
  resumeVideo$ = this.actions$
    .ofType(player.ActionTypes.RESUME)
    .map(action => {
      this.youtube.player.playVideo();
      return of({});
    });

  @Effect()
  inputVolume$ = this.actions$
    .ofType(player.ActionTypes.INPUT_VOL)
    .map(action => {
      this.youtube.player.setVolume(action.payload);
      return of({});
    });

  @Effect()
  setVolume$ = this.actions$
    .ofType(player.ActionTypes.SET_VOL)
    .map(action => {
      this.localStorage.set('playerVolume', action.payload);
      return of({});
    });

  constructor(private actions$: Actions, private youtube: YoutubeService, private localStorage: LocalStorageService) { }
}
