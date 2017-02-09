import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { DiscogsSales } from '../../models';

@Component({
  selector: 'app-sales',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  salesList$: Observable<DiscogsSales>;

  constructor(private store: Store<fromRoot.State>) {
    // this.salesList$ = store.select(fromRoot.getSalesList);
  }
}
