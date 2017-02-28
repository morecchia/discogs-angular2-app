import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as moment from 'moment';

import * as fromRoot from '../../reducers';
import * as player from '../../actions/player';

import { YoutubeVideo, PlayerTime } from '../../models';

@Component({
  selector: 'app-player-time',
  templateUrl: './player-time.component.html',
  styleUrls: ['./player-time.component.css']
})
export class PlayerTimeComponent {
  @Input()
  video: YoutubeVideo;

  @Input()
  playerTime: PlayerTime;

  @Input()
  duration: string;

  get durationSeconds() {
    return moment.duration(this.duration, 'seconds').asSeconds();
  }

  seekTo(value: number) {
    this.store.dispatch(new player.SeekAction({
      duration: this.video.contentDetails.duration,
      startTime: value
    }));
  }

  constructor(private store: Store<fromRoot.State>) { }
}
