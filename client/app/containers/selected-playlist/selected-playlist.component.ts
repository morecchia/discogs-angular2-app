import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selected-playlist.component.html'
})
export class SelectedPlaylistComponent {
  playlists$: Observable<Playlist[]>;
  selectedPlaylist$: Observable<Playlist>;
  activeVideoId$: Observable<string>;

  onSelectedVideo(data) {
    this.store.dispatch(new videos.SelectedAction(data));
  }

  onVideoRemoved(video: SelectedVideo) {
    this.store.dispatch(new playlist.RemoveVideoAction(video));
  }

  constructor(private store: Store<fromRoot.State>) {
    this.playlists$ = store.select(fromRoot.getPlaylistsForList);
    this.selectedPlaylist$ = store.select(fromRoot.getCurrentPlaylist);
    this.activeVideoId$ = store.select(fromRoot.getPlayerCurrentId);
  }
}
