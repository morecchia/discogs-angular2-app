import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as moment from 'moment';

import * as fromRoot from '../../reducers';
import * as player from '../../actions/player';

import { YoutubeVideo } from '../../models';

@Component({
  selector: 'app-player-time',
  templateUrl: './player-time.component.html',
  styleUrls: ['./player-time.component.css']
})
export class PlayerTimeComponent {
  @Input()
  video: YoutubeVideo;

  @Input()
  playerTime: {formatted: string, seconds: number};

  @Input()
  duration: string;

  get durationSeconds() {
    return moment.duration(this.duration, 'seconds').asSeconds();
  }

  seekTo(value: number) {
    this.store.dispatch(new player.SeekAction({video: this.video, time: value}));
  }

  constructor(private store: Store<fromRoot.State>) { }
}
