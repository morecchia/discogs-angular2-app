import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../reducers';
import * as wantlistActions from '../../actions/wantlist';

import { DiscogsWants, Playlist } from '../../models';

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

  actionsSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.wantlist$ = store.select(fromRoot.getWantlist);
    this.playlists$ = store.select(fromRoot.getPlaylists);
    this.currentPage$ = store.select(fromRoot.getWantlistPage);
    this.loading$ = store.select(fromRoot.getWantlistLoading);

    this.actionsSubscription = route.params
      .map(() => new wantlistActions.LoadAction())
      .subscribe(store);
  }
}
