import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';

import { YoutubeVideo, DiscogsRelease } from '../../models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent {
  selectedVideo$: Observable<YoutubeVideo>;
  nextPrevVideos$: Observable<{next: YoutubeVideo, prev: YoutubeVideo}>;
  playerRelease$: Observable<DiscogsRelease>;
  playerPlaying$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedVideo$ = store.select(fromRoot.getSelectedVideo);
    this.nextPrevVideos$ = store.select(fromRoot.getNextPreviousVideos);
    this.playerRelease$ = store.select(fromRoot.getPlayerRelease);
    this.playerPlaying$ = store.select(fromRoot.getPlayerPlaying);
  }
}
