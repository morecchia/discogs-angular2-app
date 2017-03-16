import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as moment from 'moment';

import * as fromRoot from '../../reducers';
import * as player from '../../actions/player';

import { YoutubeVideo, PlayerTime, StartTime } from '../../models';

@Component({
  selector: 'app-player-time',
  templateUrl: './player-time.component.html'
})
export class PlayerTimeComponent {
  @Input()
  video: YoutubeVideo;

  @Input()
  playerTime: PlayerTime;

  @Input()
  duration: string;

  @Output()
  onVideoSeek = new EventEmitter<StartTime>();

  get durationSeconds() {
    return moment.duration(this.duration, 'seconds').asSeconds();
  }

  seekTo(seconds: number) {
    this.onVideoSeek.emit({duration: this.duration, seconds});
  }

  constructor(private store: Store<fromRoot.State>) { }
}
