import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { LocalStorageService } from 'angular-2-local-storage';

import * as fromPlaylist from '../reducers';
import * as playlist from '../actions/playlist';

import { PlaylistService } from '../services/playlist.service';

@Injectable()
export class PlaylistEffects {
  @Effect()
  loadPlaylist$: Observable<Action> = this.actions$
    .ofType(playlist.ActionTypes.LOAD)
    .startWith(new playlist.LoadAction())
    .map(action =>
      new playlist.LoadCompleteAction(
        this.playlistService.getPlaylist()
      )
    );

  @Effect()
  addVideos$ = this.actions$
    .ofType(playlist.ActionTypes.ADD)
    .withLatestFrom(this.store, (action, state) => state.playlist.videos)
    .map(videos => {
      this.playlistService.setPlaylist(videos);
      return of({});
    });

  constructor(private actions$: Actions, private store: Store<fromPlaylist.State>,
    private playlistService: PlaylistService, private localStorage: LocalStorageService) { }
}
