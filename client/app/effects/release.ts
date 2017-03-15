import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { DiscogsService, YoutubeService } from '../services';
import * as release from '../actions/release';
import * as videos from '../actions/videos';
import * as player from '../actions/player';
import * as playlist from '../actions/playlist';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 */

@Injectable()
export class ReleaseEffects {
  @Effect()
  get$: Observable<Action> = this.actions$
    .ofType(release.ActionTypes.LOAD)
    .mergeMap(action => this.discogs.getRelease(action.payload)
      .map(response => new release.LoadCompleteAction(response)));

  @Effect()
  loaded$: Observable<Action> = this.actions$
    .ofType(release.ActionTypes.LOAD_COMPLETE)
    .map(action => new videos.LoadAction(action.payload.videos &&
      action.payload.videos.map(v => this.youtube.getIdFromUrl(v.uri))
    ));

  @Effect()
  appendPlaylist$: Observable<Action> = this.actions$
    .ofType(release.ActionTypes.APPEND_PLAYLIST)
    .mergeMap(action => this.discogs.getRelease(action.payload.releaseId)
      .map(response => response.videos
        ? new release.QueueReleaseAction({release: response, id: action.payload.playlistId})
        : new videos.LoadFailAction('Sorry, this release has no videos!')
    ));

  @Effect()
  addRelease$: Observable<Action> = this.actions$
    .ofType(release.ActionTypes.QUEUE_RELEASE)
    .mergeMap(action => {
      const ids = action.payload.release.videos
        && action.payload.release.videos.map(v => this.youtube.getIdFromUrl(v.uri));
      return this.youtube.getListData(ids)
        .map(response => {
          const videos = response.items.map(item => {
              return {
                video: item,
                release: action.payload.release,
                playlistIds: []
              };
          });
          return new playlist.AddVideosAction({videos, id: action.payload.id});
        });
    });

    constructor(private actions$: Actions, private discogs: DiscogsService,
      private youtube: YoutubeService) { }
}
