import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UUID } from 'angular2-uuid';

import { DiscogsUser, Playlist } from '../../models';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
    @Input()
    user: DiscogsUser;

    @Input()
    videoSelected: boolean;

    @Input()
    playlists: Playlist[];

    @Output()
    onPlaylistRemove = new EventEmitter<Playlist>();

    @Output()
    onPlaylistAdd = new EventEmitter<Playlist>();

    searchVisible = false;

    title = 'Discogs Player';

    toggleSearch() {
      this.searchVisible = !this.searchVisible;
    }

    addPlaylist(dialog: any, playlistName: string) {
      console.log(playlistName);
      if (playlistName) {
        dialog.close();
        this.onPlaylistAdd.emit({
          name: playlistName,
          count: 0,
          id: UUID.UUID(),
          videos: []
        });
      }
    }

    removePlaylist(playlist: Playlist) {
      this.onPlaylistRemove.emit(playlist);
    }
}
