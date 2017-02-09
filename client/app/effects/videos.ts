import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { YoutubeService } from '../services';
import * as videos from '../actions/videos';


/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 */

@Injectable()
export class VideosEffects {
  @Effect()
  get$: Observable<Action> = this.actions$
    .ofType(videos.ActionTypes.LOAD)
    .mergeMap(action =>
      this.youtube.getListData(action.payload)
        .map(response => new videos.LoadCompleteAction(response))
    );

    constructor(private actions$: Actions, private youtube: YoutubeService) { }
}
