import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as discogs from '../../actions/release';
import * as playlistMenu from '../../actions/playlist';

import { DiscogsRelease, Playlist } from '../../models';

@Component({
  selector: 'app-release-preview',
  templateUrl: './release-preview.component.html',
})
export class ReleasePreviewComponent {
  @Input()
  release: DiscogsRelease;

  @Input()
  playlists: Playlist[];

  addType = 'all';

  queueAll(playlistId: string) {
    this.store.dispatch(new discogs.AppendPlaylistAction({releaseId: this.release.id, playlistId}));
  }

  addPlaylist(playlist: Playlist) {
    this.store.dispatch(new playlistMenu.AddAction(playlist));
  }

  constructor(private store: Store<fromRoot.State>) { }
}
