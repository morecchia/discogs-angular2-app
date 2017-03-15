import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { DiscogsWants, DiscogsPagination, Playlist } from '../../models';

@Component({
  selector: 'app-wantlist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wantlist.component.html',
})
export class WantlistComponent {
  wantlist$: Observable<DiscogsWants>;
  playlists$: Observable<Playlist[]>;
  loading$: Observable<boolean>;
  currentPage$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.wantlist$ = store.select(fromRoot.getWantlist);
    this.playlists$ = store.select(fromRoot.getPlaylists);
    this.currentPage$ = store.select(fromRoot.getWantlistPage);
    this.loading$ = store.select(fromRoot.getWantlistLoading);
  }
}
