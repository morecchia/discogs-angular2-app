import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from '../../reducers';
import * as search from '../../actions/search';

import { DiscogsUser, Playlist } from '../../models';

import { goodKey } from '../../util';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
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

    search(e) {
      if (goodKey(e)) {
        this.store.dispatch(new search.ClearAction());
        this.store.dispatch(new search.SearchReleasesAction({query: e.target.value, page: 1}));
      }
    }

    addPlaylist(playlist: Playlist) {
      this.onPlaylistAdd.emit(playlist);
    }

    removePlaylist(playlist: Playlist) {
      this.onPlaylistRemove.emit(playlist);
    }

    constructor(private router: Router, private store: Store<fromRoot.State>) { }
}
