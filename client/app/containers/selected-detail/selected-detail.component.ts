import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as videos from '../../actions/videos';

import { DiscogsRelease, YoutubeVideo, Playlist } from '../../models';

@Component({
  selector: 'app-selected-detail',
  templateUrl: './selected-detail.component.html'
})
export class SelectedDetailComponent {
  release$: Observable<DiscogsRelease>;
  videos$: Observable<YoutubeVideo[]>;
  videosLoading$: Observable<boolean>;
  videosLoaded$: Observable<boolean>;
  activeVideoId$: Observable<string>;
  playlists$: Observable<Playlist[]>;

  // isSelectedReleaseInCollection$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.release$ = store.select(fromRoot.getSelectedRelease);
    this.videos$ = store.select(fromRoot.getVideos);
    this.videosLoading$ = store.select(fromRoot.getVideosLoading);
    this.videosLoaded$ = store.select(fromRoot.getVideosLoaded);
    this.activeVideoId$ = store.select(fromRoot.getPlayerCurrentId);
    this.playlists$ = store.select(fromRoot.getPlaylists);
    // this.isSelectedReleaseInCollection$ = store.select(fromRoot.isSelectedReleaseInCollection);
    // this.isSelectedReleaseInWantlist$ = store.select(fromRoot.isSelectedReleaseInWantlist);
  }

  addToCollection(release: DiscogsRelease) {
    // this.store.dispatch(new collection.AddReleaseAction(release));
  }

  removeFromCollection(release: DiscogsRelease) {
    // this.store.dispatch(new collection.RemoveReleaseAction(release));
  }
}
