import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as collection from '../../actions/collection';
import { DiscogsRelease } from '../../models/release';


@Component({
  selector: 'app-selected-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selected-detail.component.html',
  styleUrls: ['./selected-detail.component.css']
})
export class SelectedBookPageComponent {
  release$: Observable<DiscogsRelease>;
  isSelectedReleaseInCollection$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.release$ = store.select(fromRoot.getSelectedRelease);
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
