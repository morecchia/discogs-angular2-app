import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { LocalStorageService } from 'angular-2-local-storage';

import * as moment from 'moment';

import * as player from '../actions/player';
import * as release from '../actions/release';
import * as videos from '../actions/videos';

import * as fromPlayer from '../reducers';

import { YoutubeService, DiscogsService } from '../services';
import { formatDuration } from '../services/youtube.service';
import { YoutubeVideo } from '../models';

@Injectable()
export class PlayerEffects {
  playerTime$: Observable<{formatted: string, seconds: number}>;

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
      this.youtube.player.loadVideoById(action.payload.video && action.payload.video.id);
      return new player.PlayingAction(action.payload.video);
    });

  @Effect()
  loadRelease$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.LOAD_RELEASE)
    .mergeMap(action => this.discogs.getRelease(action.payload)
      .map(response => new player.PlayReleaseAction(response)));

  @Effect()
  playRelease$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.PLAY_RELEASE)
    .mergeMap(action => {
      const ids = action.payload.videos && action.payload.videos.map(v => this.youtube.getIdFromUrl(v.uri));
      return this.youtube.getListData(ids)
        .map(response => new player.LoadVideosAction({videos: response.items, release: action.payload}));
    });

  @Effect()
  loadVideos$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.LOAD_VIDEOS)
    .map(action => new videos.SelectedAction({video: action.payload.videos[0], release: action.payload.release}));

  @Effect()
  seekTo$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SEEK)
    .map(action => {
      this.youtube.player.seekTo(action.payload.time);
      return new player.SetTimeAction(action.payload);
    });

  @Effect()
  setTime$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.SET_TIME)
    .switchMap(action => {
      this.playerTime$ = this.youtube.playerTime(action.payload.video, action.payload.time);
      return this.playerTime$
        .map(time => new player.GetTimeAction(time));
    });

  @Effect()
  stopVideo$ = this.actions$
    .ofType(player.ActionTypes.STOP)
    .withLatestFrom(this.store, (action, state) => state.player)
    .map(state => {
      this.youtube.player.pauseVideo();
      this.playerTime$ = null;
      return time => new player.GetTimeAction({
        formatted: state.timeFormatted,
        seconds: state.timeSeconds
      });
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
      // this.localStorage.set('playerVolume', action.payload);
      return of({});
    });

  constructor(private actions$: Actions, private store: Store<fromPlayer.State>,
    private youtube: YoutubeService, private discogs: DiscogsService) { }
}
