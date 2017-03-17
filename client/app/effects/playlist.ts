import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { LocalStorageService } from 'angular-2-local-storage';

import * as fromPlaylistMenu from '../reducers';
import * as playlistMenu from '../actions/playlist';

import { PlaylistService } from '../services/playlist.service';

@Injectable()
export class PlaylistEffects {
  @Effect()
  loadPlaylists$: Observable<Action> = this.actions$
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

  @Effect()
  addVideos$ = this.actions$
    .ofType(playlistMenu.ActionTypes.ADD_VIDEOS || playlistMenu.ActionTypes.REMOVE_VIDEO)
    .withLatestFrom(this.store, (action, state) => state.playlist)
    .map(state => {
      this.playlistService.setPlaylists(state.playlists);
      return of({});
    });

  @Effect()
  removeVideos$ = this.actions$
    .ofType(playlistMenu.ActionTypes.REMOVE_VIDEO)
    .withLatestFrom(this.store, (action, state) => state.playlist)
    .map(state => {
      this.playlistService.setPlaylists(state.playlists);
      return of({});
    });

  constructor(private actions$: Actions, private store: Store<fromPlaylistMenu.State>,
    private playlistService: PlaylistService, ) { }
}
