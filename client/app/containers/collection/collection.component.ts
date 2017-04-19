import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../reducers';
import * as collectionActions from '../../actions/collection';

import { DiscogsCollection, Playlist } from '../../models';

@Component({
  selector: 'app-collection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collection.component.html'
})
export class CollectionComponent{
  collection$: Observable<DiscogsCollection>;
  loading$: Observable<boolean>;
  currentPage$: Observable<number>;
  playlists$: Observable<Playlist[]>;

  actionsSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.collection$ = store.select(fromRoot.getCollection);
    this.currentPage$ = store.select(fromRoot.getCollectionPage);
    this.playlists$ = store.select(fromRoot.getPlaylists);
    this.loading$ = store.select(fromRoot.getCollectionLoading);

    this.actionsSubscription = route.params
      .map(() => new collectionActions.LoadAction())
      .subscribe(store);
  }
}
