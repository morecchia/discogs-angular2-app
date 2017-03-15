import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from 'angular-2-local-storage';

import * as fromPlaylistMenu from '../reducers';
import * as playlistMenu from '../actions/playlist';

import { PlaylistService } from '../services/playlist.service';

@Injectable()
export class PlaylistEffects {
  @Effect()
  loadPlaylist$: Observable<Action> = this.actions$
    .ofType(playlistMenu.ActionTypes.LOAD)
    .startWith(new playlistMenu.LoadAction())
    .map(action => {
      const playlists = this.playlistService.getPlaylists();
      return new playlistMenu.LoadCompleteAction(playlists);
    });

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType(playlistMenu.ActionTypes.ADD)
    .withLatestFrom(this.store, (action, state) => {
      return {action, playlists: state.playlist.playlists};
    })
    .map(state => {
      const playlists = state.playlists.slice(0);
      playlists.push(state.action.payload);
      this.playlistService.setPlaylists(playlists);
      return new playlistMenu.AddCompleteAction(playlists);
    });

  constructor(private actions$: Actions, private store: Store<fromPlaylistMenu.State>,
    private playlistService: PlaylistService, ) { }
}
