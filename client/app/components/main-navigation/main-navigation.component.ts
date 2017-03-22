import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { UuidService } from 'angular2-uuid';

import * as fromRoot from '../../reducers';
import * as search from '../../actions/search';

import { DiscogsUser, Playlist } from '../../models';

import { goodKey } from '../../util';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html'
})
export class MainNavigationComponent {
  @Input()
  layout: any;

  @Input()
  user: DiscogsUser;

  @Input()
  playlists: Playlist[];

  @Output()
  onPlaylistRemove = new EventEmitter<Playlist>();

  @Output()
  onPlaylistAdd = new EventEmitter<Playlist>();

  @Output()
  onSearch = new EventEmitter<string>();

  addPlaylist(dialog: any, playlistName: string) {
    if (playlistName) {
      dialog.close();
      this.onPlaylistAdd.emit({
        name: playlistName,
        count: 0,
        id: this.uuid.generate(),
        videos: []
      });
    }
  }

  removePlaylist(playlist: Playlist) {
    this.onPlaylistRemove.emit(playlist);
  }

  search(term: string) {
    this.onSearch.emit(term);
  }

  constructor(private store: Store<fromRoot.State>, private uuid: UuidService) { }
}
