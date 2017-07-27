import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { UuidService } from 'angular2-uuid';

import * as fromRoot from '../../reducers';
import * as userActions from '../../actions/user';

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

  currentId: string;
  playlistName: string;

  addPlaylist(dialog: any) {
    if (!this.playlistName) {
      return;
    }

    this.onPlaylistAdd.emit({
      name: this.playlistName,
      count: 0,
      id: this.uuid.generate(),
      videos: []
    });

    dialog.close();
  }

  removePlaylist(playlist: Playlist) {
    this.onPlaylistRemove.emit(playlist);
  }

  logout(layout) {
    if (layout) {
      layout.closeDrawer();
    }
    this.store.dispatch(new userActions.LogoutAction());
    this.router.navigate(['/login']);
  }

  onDialogHide() {
    this.playlistName = '';
  }

  constructor(private store: Store<fromRoot.State>, private uuid: UuidService, private router: Router) { }
}
