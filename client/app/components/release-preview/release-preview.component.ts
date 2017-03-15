import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as discogs from '../../actions/release';

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

  queueAll(playlistId: string) {
    this.store.dispatch(new discogs.AppendPlaylistAction({releaseId: this.release.id, playlistId}));
  }

  constructor(private store: Store<fromRoot.State>) { }
}
