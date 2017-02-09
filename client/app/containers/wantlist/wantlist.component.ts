import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { DiscogsWants } from '../../models';

@Component({
  selector: 'app-wantlist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wantlist.component.html',
})
export class WantlistComponent {
  wantlist$: Observable<DiscogsWants>;

  constructor(private store: Store<fromRoot.State>) {
    this.wantlist$ = store.select(fromRoot.getWantlist);
  }
}
