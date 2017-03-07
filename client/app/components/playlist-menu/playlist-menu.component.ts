import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as moment from 'moment';

import * as fromRoot from '../../reducers';
import * as player from '../../actions/player';
import * as videos from '../../actions/videos';

import { YoutubeVideo } from '../../models';

@Component({
  selector: 'app-playlist-menu',
  templateUrl: './playlist-menu.component.html',
  styleUrls: ['./playlist-menu.component.css']
})
export class PlaylistMenuComponent {

  @Input()
  currentId: YoutubeVideo;

  @Input()
  playlist: YoutubeVideo[];

  @Input()
  playlistTitle: string;

  @Input()
  releaseImageUri: string;

  @Output()
  onPlaylistSelected = new EventEmitter<YoutubeVideo>();

  @Output()
  onVideoRemoved = new EventEmitter<YoutubeVideo>();
}
