import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

import * as moment from 'moment';

import * as fromRoot from '../../reducers';
import * as player from '../../actions/player';
import * as videos from '../../actions/videos';

import { YoutubeService } from '../../services';
import { YoutubeVideo, PlayerTime, DiscogsRelease, SelectedVideo } from '../../models';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html'
})
export class PlayerControlsComponent {
  @ViewChild('skipNextButton')
  skipNextButton: ElementRef;

  @Input()
  playerCurrent: YoutubeVideo;

  @Input()
  playlist: SelectedVideo[];

  @Input()
  nextVideo: SelectedVideo;

  @Input()
  prevVideo: SelectedVideo;

  @Input()
  playing: boolean;

  @Input()
  playerTime: PlayerTime;

  @Input()
  volume: number;

  @Input()
  playerRelease: DiscogsRelease;

  @Output()
  onVideoSkipped = new EventEmitter<SelectedVideo>();

  @Output()
  onVideoTogglePlay = new EventEmitter<number>();

  @Output()
  onVolumeChanged = new EventEmitter<number>();

  @Output()
  onVolumeSet = new EventEmitter<number>();

  volumeVisible = false;

  togglePlay() {
    this.onVideoTogglePlay.emit(this.playerTime.seconds);
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

  toggleVolume() {
    this.store.dispatch(new player.VolumeInputAction(0));
  }

  inputVolume(value: number) {
    this.store.dispatch(new player.VolumeInputAction(value));
  }

  constructor(private store: Store<fromRoot.State>, private youtube: YoutubeService) {
    this.youtube.playbackEnded$
      .subscribe(() =>
        this.skipNextButton.nativeElement.click()
      );
  }
}
