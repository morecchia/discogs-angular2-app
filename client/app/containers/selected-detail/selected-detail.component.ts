import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { DiscogsRelease } from '../../models/release';

@Component({
  selector: 'app-selected-detail',
  templateUrl: './selected-detail.component.html',
  styleUrls: ['./selected-detail.component.css']
})
export class SelectedDetailComponent {
  release$: Observable<DiscogsRelease>;
  isSelectedReleaseInCollection$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.release$ = store.select(fromRoot.getRelease);
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
