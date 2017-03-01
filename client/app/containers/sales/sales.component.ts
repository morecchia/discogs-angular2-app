import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { DiscogsSales } from '../../models';

@Component({
  selector: 'app-sales',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sales.component.html'
})
export class SalesComponent {
  sales$: Observable<DiscogsSales>;
  loading$: Observable<boolean>;
  currentPage$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.sales$ = store.select(fromRoot.getSales);
    this.loading$ = store.select(fromRoot.getSalesLoading);
    this.currentPage$ = store.select(fromRoot.getSalesPage);
  }
}
