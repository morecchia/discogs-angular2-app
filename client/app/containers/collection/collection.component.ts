import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { DiscogsCollection } from '../../models';

@Component({
  selector: 'app-collection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collection.component.html'
})
export class CollectionComponent{
  collection$: Observable<DiscogsCollection>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.collection$ = store.select(fromRoot.getCollection);
    this.loading$ = store.select(fromRoot.getCollectionLoading);
  }
}
