import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { UUID } from 'angular2-uuid';

import * as fromRoot from '../../reducers';
import * as search from '../../actions/search';

import { DiscogsUser, Playlist } from '../../models';

import { goodKey } from '../../util';

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

    onSearch(e) {
      if (goodKey(e)) {
        this.store.dispatch(new search.SearchReleasesAction({query: e.target.value, page: 1}));
      }
    }

    addPlaylist(dialog: any, playlistName: string) {
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

    constructor(private store: Store<fromRoot.State>) { }
}
