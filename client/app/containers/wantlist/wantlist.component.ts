import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { DiscogsWants, DiscogsPagination } from '../../models';

@Component({
  selector: 'app-wantlist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wantlist.component.html',
})
export class WantlistComponent {
  wantlist$: Observable<DiscogsWants>;
  loading$: Observable<boolean>;
  currentPage$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.wantlist$ = store.select(fromRoot.getWantlist);
    this.currentPage$ = store.select(fromRoot.getWantlistPage);
    this.loading$ = store.select(fromRoot.getWantlistLoading);
  }
}
