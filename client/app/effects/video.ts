import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import * as moment from 'moment';

import * as videos from '../actions/videos';
import * as player from '../actions/player';
import * as playlist from '../actions/playlist';
import * as fromRoot from '../reducers';

import { YoutubeService } from '../services';
import { YoutubeVideo  } from '../models';

@Injectable()
export class VideoEffects {

  @Effect()
  selectVideo$: Observable<Action> = this.actions$
    .ofType(videos.ActionTypes.SELECTED)
    .withLatestFrom(this.store, (action, store) => {
      return {videos: store.videos, playlist: store.playlist, action};
    })
    .mergeMap(state => [
      new player.PlayAction(state.action.payload),
      new playlist.PlayAction({
        id: state.playlist.current && state.playlist.current.id,
        name: state.playlist.current && state.playlist.current.name,
        videos: state.action.payload.videos || state.videos
      }),
      new player.SetTimeAction({
        duration: state.action.payload.selected.video
          && state.action.payload.selected.video.contentDetails.duration,
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

  constructor(private actions$: Actions, private youtube: YoutubeService, private store: Store<fromRoot.State>) { }
}
