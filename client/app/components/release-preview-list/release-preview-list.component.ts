import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as collection from '../../actions/collection';
import * as fromRoot from '../../reducers';
import { DiscogsCollection, DiscogsItem } from '../../models';

@Component({
  selector: 'app-release-preview-list',
  templateUrl: './release-preview-list.component.html',
  styleUrls: ['./release-preview-list.component.css']
})
export class ReleasePreviewListComponent {
  @Input() collection: DiscogsCollection;

  currentPage = 1;
  itemsPerPage = 10;

  get totalItems() { return this.collection.pagination.items || 0; };

  getPage(page: number) {
    this.collection.releases = [];
    this.currentPage = page;
    this.store.dispatch(new collection.LoadAction(page));
  }

  constructor(private store: Store<fromRoot.State>) {}
}
