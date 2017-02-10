import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';

import * as moment from 'moment';

import * as player from '../actions/player';
import { YoutubeService, formatDuration } from '../services/youtube.service';
import { YoutubeVideo  } from '../models';

@Injectable()
export class PlayerEffects {
  @Effect()
  initPlayer$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.INIT)
    .map(action => {
      this._initPlayer(action.payload);
      return new player.InitSuccessAction(action.payload);
    });

  @Effect()
  resumeVideo$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.PLAY)
    .map(action => {
      this.youtube.player.loadVideoById(action.payload.video.id);
      return new player.PlayingAction(action.payload.video);
    });

  private _initPlayer(video: YoutubeVideo) {
    this.youtube.player.on('ready', event => {
        event.target.setVolume(50);
        // this.currentTime = this._timer(this._currentDuration);
        console.log('player ready');
      });

      this.youtube.player.on('stateChange', event => {
        switch (event.data) {
          case 0:
            this.youtube.tryNextVideo();
            break;
          case 1:
            this.youtube.player.getCurrentTime()
              .then(time => {
                this.youtube.currentTime = this.youtube.timer(this.youtube.currentDuration, time);
              });
            break;
          case 3:
            this.youtube.currentTime = Observable.of(
              formatDuration(moment.duration(this.youtube.currentTimeSeconds, 'seconds'))
            );
            break;
        }
      });
  }

  constructor(private actions$: Actions, private youtube: YoutubeService) { }
}
