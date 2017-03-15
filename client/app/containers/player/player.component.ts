import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';

import { YoutubeVideo, DiscogsRelease, PlayerTime, SelectedVideo } from '../../models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent {
  playerCurrent$: Observable<YoutubeVideo>;
  nextPrevVideos$: Observable<{next: SelectedVideo, prev: SelectedVideo}>;
  playerRelease$: Observable<DiscogsRelease>;
  playerPlaying$: Observable<boolean>;
  playerTime$: Observable<PlayerTime>;
  playerVolume$: Observable<number>;
  playlist$: Observable<SelectedVideo[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.playerCurrent$ = store.select(fromRoot.getPlayerCurrent);
    this.nextPrevVideos$ = store.select(fromRoot.getNextPreviousVideos);
    this.playerRelease$ = store.select(fromRoot.getPlayerRelease);
    this.playerPlaying$ = store.select(fromRoot.getPlayerPlaying);
    this.playerTime$ = store.select(fromRoot.getPlayerTime);
    this.playerVolume$ = store.select(fromRoot.getPlayerVolume);
    this.playlist$ = store.select(fromRoot.getPlaylistVideos);
  }
}
