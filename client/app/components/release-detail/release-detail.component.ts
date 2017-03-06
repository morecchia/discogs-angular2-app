import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import * as fromRoot from '../../reducers';
import * as videos from '../../actions/videos';
import * as player from '../../actions/player';
import * as playlist from '../../actions/playlist';

import { YoutubeService} from '../../services';

import { DiscogsRelease, YoutubeVideo } from '../../models';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.css']
})
export class ReleaseDetailComponent implements OnDestroy {
  @Input()
  release: DiscogsRelease;

  @Input()
  releaseVideos: YoutubeVideo[];

  @Input()
  videosLoading: boolean;

  @Input()
  videosLoaded: boolean;

  @Input()
  activeVideoId: string;

  releaseImagesVisible = false;

  get activeTabIndex() { return this.videosLoaded && !this.releaseVideos.length ? 0 : 1; }

  constructor(private store: Store<fromRoot.State>, private youtube: YoutubeService) { }

  onSelectedVideo(video: YoutubeVideo) {
    this.store.dispatch(new videos.SelectedAction({video, release: this.release}));
  }

  onQueuedVideo(video: YoutubeVideo) {
    this.store.dispatch(new playlist.AddAction([{video, release: this.release}]));
  }

  toggleImages() {
    this.releaseImagesVisible = !this.releaseImagesVisible;
  }

  ngOnDestroy() {
    this.store.dispatch(new videos.ClearAction());
  }
}
