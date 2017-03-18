import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MdlSnackbarService } from 'angular2-mdl';

import * as fromRoot from '../../reducers';
import * as playlistMenu from '../../actions/playlist';

import { DiscogsUser, Playlist } from '../../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user$: Observable<DiscogsUser>;
  videoSelected$: Observable<boolean>;
  playlists$: Observable<Playlist[]>;

  private _showError(message: string) {
    this.mdlSnackbarService.showSnackbar({
      message: message,
      action: {
        handler: () => { },
        text: 'OK'
      }
    });
  }

  onPlaylistAdd(playlist: Playlist) {
    this.store.dispatch(new playlistMenu.AddAction(playlist));
  }

  constructor(private store: Store<fromRoot.State>, private mdlSnackbarService: MdlSnackbarService) {
      this.user$ = store.select(fromRoot.getUser);
      this.playlists$ = store.select(fromRoot.getPlaylists);
      this.videoSelected$ = store.select(fromRoot.getPlayerCurrent)
        .map(video => video !== null);

      store.select(fromRoot.getVideosLoadingFailed)
        .subscribe(message => {
          if (message) {
            this._showError(message);
          }
        });
    }
}
