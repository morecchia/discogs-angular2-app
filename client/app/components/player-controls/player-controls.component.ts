import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

import * as moment from 'moment';

import * as fromRoot from '../../reducers';
import * as player from '../../actions/player';

import { YoutubeService } from '../../services';
import { YoutubeVideo } from '../../models';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.css']
})
export class PlayerControlsComponent {
  @ViewChild('skipNextButton')
  skipNextButton: ElementRef;

  @Input()
  video: YoutubeVideo;

  @Input()
  nextVideo: YoutubeVideo;

  @Input()
  prevVideo: YoutubeVideo;

  @Input()
  playing: boolean;

  @Input()
  volume = 50;

  @Output()
  onVideoSkipped = new EventEmitter<YoutubeVideo>();

  @Output()
  onVolumeChanged = new EventEmitter<number>();

  @Output()
  onVolumeSet = new EventEmitter<number>();

  volumeVisible = false;

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
