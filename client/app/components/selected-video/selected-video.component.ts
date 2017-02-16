import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as videos from '../../actions/videos';
import { DiscogsRelease, YoutubeVideo } from '../../models';

@Component({
  selector: 'app-selected-video',
  templateUrl: './selected-video.component.html',
  styleUrls: ['./selected-video.component.css']
})
export class SelectedVideoComponent {
  @Input()
  selectedVideo: YoutubeVideo;

  @Input()
  playerRelease: DiscogsRelease;

  @Input()
  playing: boolean;

  @Input()
  nextPrevVideos: {next: YoutubeVideo, prev: YoutubeVideo};

  constructor(private store: Store<fromRoot.State>) { }

  onVideoSkipped(video: YoutubeVideo) {
    if (video) {
      this.store.dispatch(new videos.SelectedAction({video, release: this.playerRelease}));
    }
  }
}
