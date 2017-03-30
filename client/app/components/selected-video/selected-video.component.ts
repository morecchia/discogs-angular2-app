import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as videos from '../../actions/videos';
import * as player from '../../actions/player';

import { DiscogsRelease, YoutubeVideo, PlayerTime, StartTime, SelectedVideo } from '../../models';

@Component({
  selector: 'app-selected-video',
  templateUrl: './selected-video.component.html'
})
export class SelectedVideoComponent {
  @Input()
  playerCurrent: YoutubeVideo;

  @Input()
  playlist: SelectedVideo[];

  @Input()
  playerRelease: DiscogsRelease;

  @Input()
  playerTime: {formatted: string, seconds: number};

  @Input()
  playerVolume: number;

  @Input()
  playing: boolean;

  @Input()
  nextPrevVideos: {next: SelectedVideo, prev: SelectedVideo};

  @Output()
  onTogglePlayerVisibility = new EventEmitter<boolean>();

  playerFrameVisible = false;

  onVideoSkipped(data) {
    if (data.selected) {
      this.store.dispatch(new videos.SelectedAction(data));
    }
  }

  onPlaylistSelected(selected: SelectedVideo) {
    this.store.dispatch(new videos.SelectedAction({selected, videos: this.playlist}));
  }

  onVideoSeek(time: StartTime) {
    this.store.dispatch(new player.SeekAction(time));
  }

  onVideoTogglePlay(playing: boolean) {
    this.store.dispatch(new player.TogglePlayAction(playing));
  }

  onVolumeSet(volume: number) {
    this.store.dispatch(new player.VolumeInputAction(volume));
  }

  togglePlayerFrame() {
    if (!this.playing && !this.playerFrameVisible) {
      const selecteddVideo = {video: this.playerCurrent, release: this.playerRelease};
      this.store.dispatch(new videos.SelectedAction({selected: selecteddVideo, videos: this.playlist}));
    }

    this.playerFrameVisible = !this.playerFrameVisible;
    this.onTogglePlayerVisibility.emit(this.playerFrameVisible);
  }

  constructor(private store: Store<fromRoot.State>) { }
}
