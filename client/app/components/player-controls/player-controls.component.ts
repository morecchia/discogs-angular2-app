import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as player from '../../actions/player';
import { YoutubeVideo } from '../../models';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.css']
})
export class PlayerControlsComponent {
  @Input()
  video: YoutubeVideo;

  @Input()
  nextVideo: YoutubeVideo;

  @Input()
  prevVideo: YoutubeVideo;

  @Input()
  playing: boolean;

  @Output()
  onVideoSkipped = new EventEmitter<YoutubeVideo>();

  volumeVisible = false;

  constructor(private store: Store<fromRoot.State>) { }

  pauseVideo() {
    this.store.dispatch(new player.StopAction());
  }

  resumeVideo() {
    this.store.dispatch(new player.ResumeAction());
  }

  skipNext() {
    this.onVideoSkipped.emit(this.nextVideo);
  }

  skipPrev() {
    this.onVideoSkipped.emit(this.prevVideo);
  }

  toggleVolumeVisibility(hidden = false) {
    setTimeout(() => {
      this.volumeVisible = !hidden;
    }, 200);
  }

  inputVolume(value) {
    // if (this.player) {
    //   this.player.setVolume(value);
    // }
  }

  changeVolume(value: number) {
    // this.localStorage.set('playerVolume', value);
  }
}
