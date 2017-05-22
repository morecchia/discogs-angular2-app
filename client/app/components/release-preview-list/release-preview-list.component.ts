import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as collection from '../../actions/collection';
import * as fromRoot from '../../reducers';
import { DiscogsCollection, Playlist } from '../../models';

@Component({
  selector: 'app-release-preview-list',
  templateUrl: './release-preview-list.component.html'
})
export class ReleasePreviewListComponent {
  @Input()
  collection: DiscogsCollection;

  @Input()
  playlists: Playlist[];

  @Input()
  loading: boolean;

  @Input()
  currentPage = 1;

  get itemsPerPage() { return (this.collection.pagination && this.collection.pagination.per_page) || 0; };
  get totalItems() { return (this.collection.pagination && this.collection.pagination.items) || 0; };

  getNextPage() {
    this.currentPage = this.currentPage + 1;
    this.store.dispatch(new collection.LoadAction(this.currentPage));
  }

  constructor(private store: Store<fromRoot.State>) { }
}
