import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../reducers';
import * as salesActions from '../../actions/sales';

import { DiscogsSales, Playlist } from '../../models';

@Component({
  selector: 'app-sales',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sales.component.html'
})
export class SalesComponent {
  sales$: Observable<DiscogsSales>;
  playlists$: Observable<Playlist[]>;
  loading$: Observable<boolean>;
  currentPage$: Observable<number>;

  actionsSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.sales$ = store.select(fromRoot.getSales);
    this.playlists$ = store.select(fromRoot.getPlaylists);
    this.loading$ = store.select(fromRoot.getSalesLoading);
    this.currentPage$ = store.select(fromRoot.getSalesPage);

    this.actionsSubscription = route.params
      .map(() => new salesActions.LoadAction())
      .subscribe(store);
  }
}
