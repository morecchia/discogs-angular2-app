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
      this.youtube.initPlayer(settings.volume);
      return new player.InitSuccessAction(settings);
    });

  @Effect()
  playVideo$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.PLAY)
    .withLatestFrom(this.store, (action, state) => {
      return {videos: state.videos.videos, action};
    })
    .map(state => {
      this.youtube.player.loadVideoById(state.action.payload.video
        && state.action.payload.video.id);
      this.youtube.setSelectedVideo(state.action.payload);
      return new player.PlayingAction({
        selected: state.action.payload.video,
        videos: state.videos
      });
    });

  @Effect()
  playlistPlay$ = this.actions$
    .ofType(player.ActionTypes.PLAYLIST_PLAY)
    .withLatestFrom(this.store, (action, state) => {
      return {video: action.payload, release: state.player.release};
    })
    .map(selected => {
      this.youtube.player.loadVideoById(selected.video && selected.video.id);
      this.youtube.setSelectedVideo(selected);
      return Observable.of({});
    });

  @Effect()
  loadVideos$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.LOAD_VIDEOS)
    .map(action => new videos.SelectedAction({
      video: action.payload.videos[0],
      release: action.payload.release
    }));

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
        playing: state.player.playing,
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

      this.youtube.player.playVideo();
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
