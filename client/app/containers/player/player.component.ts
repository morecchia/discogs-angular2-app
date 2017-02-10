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
  currentRelease$: Observable<DiscogsRelease>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedVideo$ = store.select(fromRoot.getSelectedVideo);
    this.currentRelease$ = store.select(fromRoot.getSelectedRelease);
  }
}
