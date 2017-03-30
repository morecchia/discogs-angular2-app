import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { LocalStorageService } from 'angular-2-local-storage';

import * as player from '../actions/player';
import * as videos from '../actions/videos';

import * as fromPlayer from '../reducers';

import { YoutubeService, formatDuration } from '../services/youtube.service';
import { YoutubeVideo, PlayerTime } from '../models';

@Injectable()
export class PlayerEffects {
  @Effect()
  initPlayer$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.INIT)
    .map(action => {
      const settings = this.youtube.getPlayerSettings();
      return new player.InitSuccessAction(settings);
    });

  @Effect()
  initFail$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.PLAYBACK_FAILED)
    .map(action => {
      return new player.TogglePlayAction(false);
    });

  @Effect()
  playVideo$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.PLAY)
    .map(action => {
      this.youtube.setSelectedVideo(action.payload.selected);
      const videoId = action.payload.selected.video && action.payload.selected.video.id;

      if (!this.youtube.player) {
        this.youtube.initPlayer(videoId);
        return new player.PlayingAction();
      }

      this.youtube.player.loadVideoById(videoId);
      return new player.PlayingAction();
    });

  @Effect()
  seekTo$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEEK)
    .map(action => {
      this.youtube.player.seekTo(action.payload.seconds);
      return new player.SetTimeAction(action.payload);
    });

  @Effect()
  setTime$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SET_TIME)
    .switchMap(action =>
      this.youtube.playerTime(action.payload)
        .map((time: PlayerTime) => new player.GetTimeAction(time))
    );

  @Effect()
  togglePlay$ = this.actions$
    .ofType(player.ActionTypes.TOGGLE_PLAY)
    .withLatestFrom(this.store, (action, state) => {
      return {
        playing: action.payload,
        time: state.player.timeSeconds,
        video: state.player.current
      };
    })
    .map(state => {
      if (!state.playing) {
        this.youtube.player.pauseVideo();
        return new player.SetTimeAction({
          duration: null,
          seconds: state.time
        });
      }

      if (!this.youtube.player) {
        this.youtube.initPlayer();
      } else {
        this.youtube.player.playVideo();
      }

      return new player.SetTimeAction({
        duration: state.video.contentDetails.duration,
        seconds: state.time
      });
    });

  @Effect()
  inputVolume$ = this.actions$
    .ofType(player.ActionTypes.INPUT_VOL)
    .map(action => {
      this.youtube.setVolume(action.payload);
      return of({});
    });

  constructor(private actions$: Actions, private store: Store<fromPlayer.State>,
    private youtube: YoutubeService, private localStorage: LocalStorageService) { }
}
