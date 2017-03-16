import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as videos from '../../actions/videos';
import * as playlist from '../../actions/playlist';

import { Playlist, SelectedVideo } from '../../models';

interface PlaylistAdd {
  video: SelectedVideo;
  id: string;
}

@Component({
  selector: 'app-selected-playlist',
  templateUrl: './selected-playlist.component.html'
})
export class SelectedPlaylistComponent {
  playlists$: Observable<Playlist[]>;
  selectedPlaylist$: Observable<Playlist>;

  onSelectedVideo(selected: SelectedVideo) {
    this.store.dispatch(new videos.SelectedAction(selected));
  }

  constructor(private store: Store<fromRoot.State>) {
    this.playlists$ = store.select(fromRoot.getPlaylists);
    this.selectedPlaylist$ = store.select(fromRoot.getCurrentPlaylist);
  }
}
