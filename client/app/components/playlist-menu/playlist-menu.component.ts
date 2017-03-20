import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as moment from 'moment';

import * as fromRoot from '../../reducers';
import * as player from '../../actions/player';
import * as videos from '../../actions/videos';

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
