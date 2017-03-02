import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import * as moment from 'moment';

import * as videos from '../actions/videos';
import * as player from '../actions/player';

import { YoutubeService } from '../services';
import { YoutubeVideo  } from '../models';

@Injectable()
export class VideoEffects {

  @Effect()
  selectVideo$: Observable<Action> = this.actions$
    .ofType(videos.ActionTypes.SELECTED)
    .mergeMap(action => [
      new player.PlayAction(action.payload),
      new player.SetTimeAction({
        duration: action.payload.video.contentDetails.duration,
        seconds: 0
      })
    ]);

  @Effect()
  selectFromPlaylist$: Observable<Action> = this.actions$
    .ofType(videos.ActionTypes.PLAYLIST_SELECTED)
    .mergeMap(action => [
      new player.PlaylistPlayAction(action.payload.video),
      new player.SetTimeAction({
        duration: action.payload.video.contentDetails.duration,
        seconds: 0
      })
    ]);

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(videos.ActionTypes.LOAD)
    .mergeMap(action =>
      this.youtube.getListData(action.payload)
        .map(response => new videos.LoadCompleteAction(response)));

  @Effect()
  loadCompleted$: Observable<Action> = this.actions$
    .ofType(videos.ActionTypes.LOAD_COMPLETE)
    .map(action => new player.InitAction());

  constructor(private actions$: Actions, private youtube: YoutubeService) { }
}
