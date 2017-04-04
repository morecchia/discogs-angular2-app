import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as discogsSearch from '../../actions/search';
import * as fromRoot from '../../reducers';

import { DiscogsSearch } from '../../models';

@Component({
  selector: 'app-search-preview-list',
  templateUrl: './search-preview-list.component.html'
})
export class SearchPreviewListComponent {
  @Input()
  searchResults: DiscogsSearch;

  @Input()
  searchTerm: string;

  @Input()
  searching: boolean;

  @Input()
  currentPage;

  get itemsPerPage() { return this.searchResults.pagination.per_page || 0; };
  get totalItems() { return this.searchResults.pagination.items || 0; };

  getNextPage() {
    this.currentPage = this.currentPage + 1;
    this.store.dispatch(
      new discogsSearch.SearchReleasesAction({query: this.searchTerm, page: this.currentPage})
    );
  }

  constructor(private store: Store<fromRoot.State>) { }
}
