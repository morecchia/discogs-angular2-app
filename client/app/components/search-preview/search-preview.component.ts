import { Component, Input } from '@angular/core';

import { DiscogsSearchResult, Playlist } from '../../models';

@Component({
  selector: 'app-search-preview',
  templateUrl: './search-preview.component.html'
})
export class SearchPreviewComponent {
  @Input()
  result: DiscogsSearchResult;

  @Input()
  playlists: Playlist;

  @Input()
  addType: string;

  addPlaylist(playlist: Playlist) {
  }

  queueAll(id: string) {
  }
}
