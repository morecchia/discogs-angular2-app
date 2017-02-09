import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as videos from '../../actions/videos';

import { YoutubeService } from '../../services';
import { DiscogsRelease, YoutubeVideo } from '../../models';

@Component({
  selector: 'app-selected-detail',
  templateUrl: './selected-detail.component.html'
})
export class SelectedDetailComponent {
  release$: Observable<DiscogsRelease>;
  videos$: Observable<YoutubeVideo[]>;

  isSelectedReleaseInCollection$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private youtube: YoutubeService) {
    this.release$ = store.select(fromRoot.getSelectedRelease);
    this.videos$ = store.select(fromRoot.getVideos);
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
