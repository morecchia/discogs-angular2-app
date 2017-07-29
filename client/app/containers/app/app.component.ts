import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as playlistMenu from '../../actions/playlist';
import * as search from '../../actions/search';

import { goodKey } from '../../util';
import { SnackbarService } from '../../services';
import { DiscogsUser, Playlist } from '../../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user$: Observable<DiscogsUser>;
  videoSelected$: Observable<boolean>;
  playlists$: Observable<Playlist[]>;

  onPlaylistAdd(playlist: Playlist) {
    this.store.dispatch(new playlistMenu.AddAction(playlist));
  }

  search(e) {
    if (goodKey(e)) {
      this.store.dispatch(new search.ClearAction());
      this.store.dispatch(new search.SearchReleasesAction({query: e.target.value, page: 1}));
    }
  }

  constructor(private store: Store<fromRoot.State>, private snackbar: SnackbarService) {
    this.user$ = store.select(fromRoot.getUser);
    this.playlists$ = store.select(fromRoot.getPlaylists);
    this.videoSelected$ = store.select(fromRoot.getPlayerCurrent)
      .map(video => video !== null);

    store.select(fromRoot.getVideosLoadingFailed)
      .subscribe(message => {
        if (message) {
          this.snackbar.showError(message);
        }
      });

    store.select(fromRoot.getSearchFailed)
      .subscribe(error => {
        if (error) {
          this.snackbar.showError(error.message);
        }
      });
  }
}
