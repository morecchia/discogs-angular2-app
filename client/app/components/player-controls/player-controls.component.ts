import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

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
  onVideoTogglePlay = new EventEmitter<boolean>();

  @Output()
  onVolumeSet = new EventEmitter<number>();

  volumeVisible = false;

  togglePlay() {
    this.onVideoTogglePlay.emit(!this.playing);
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
    const storedVolume = this.youtube.getStoredVolume() || 50;
    this.volume = this.volume === 0 ? storedVolume : 0;
    this.youtube.setVolume(this.volume, false);
  }

  constructor(private youtube: YoutubeService) {
    this.youtube.playbackEnded$
      .subscribe(() => this.skipNextButton.nativeElement.click());
  }
}
