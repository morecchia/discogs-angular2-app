import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

import * as videos from '../actions/videos';
import * as player from '../actions/player';

import { YoutubeVideo  } from '../models';

@Injectable()
export class VideoEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  selectVideo$: Observable<Action> = this.actions$
    .ofType(videos.ActionTypes.SELECTED)
    .map(action => {
      return new player.InitAction(action.payload);
    });

  constructor(private actions$: Actions) { }
}
