import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Playlist } from '../../models';

@Component({
  selector: 'app-playlist-menu',
  templateUrl: './playlist-menu.component.html'
})
export class PlaylistMenuComponent {
  @Input()
  layout: any;

  @Input()
  currentId: string;

  @Input()
  playlists: Playlist[];

  @Output()
  onPlaylistRemoved = new EventEmitter<Playlist>();
}
