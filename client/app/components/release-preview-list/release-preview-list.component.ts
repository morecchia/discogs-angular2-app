import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as collection from '../../actions/collection';
import * as fromRoot from '../../reducers';
import { DiscogsCollection } from '../../models';

@Component({
  selector: 'app-release-preview-list',
  templateUrl: './release-preview-list.component.html'
})
export class ReleasePreviewListComponent {
  @Input()
  collection: DiscogsCollection;

  @Input()
  loading: boolean;

  @Input()
  currentPage = 1;

  get itemsPerPage() { return this.collection.pagination.per_page || 0; };
  get totalItems() { return this.collection.pagination.items || 0; };

  getPage(page: number) {
    this.currentPage = page;
    this.store.dispatch(new collection.LoadAction(page));
  }

  constructor(private store: Store<fromRoot.State>) { }
}
