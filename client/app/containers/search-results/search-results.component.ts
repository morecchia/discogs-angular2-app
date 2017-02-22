import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as search from '../../actions/search';

import { DiscogsSearch, DiscogsSearchResult } from '../../models';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent {
  searchResults$: Observable<DiscogsSearch>;
  searching$: Observable<boolean>;
  searchTerm$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.searchResults$ = store.select(fromRoot.getSearchResults);
    this.searching$ = store.select(fromRoot.getSearchLoading);
    this.searchTerm$ = store.select(fromRoot.getSearchQuery);
  }

  addToCollection(id: number) {
    // this.store.dispatch(new collection.AddReleaseAction(id));
  }

  removeFromCollection(id: number) {
    // this.store.dispatch(new collection.RemoveReleaseAction(id));
  }
}
