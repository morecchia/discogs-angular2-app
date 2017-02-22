import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as search from '../../actions/search';
import { DiscogsSearch, DiscogsSearchResult } from '../../models';

@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html'
})
export class SearchComponent {
  searchResults$: Observable<DiscogsSearch>;
  searching$: Observable<boolean>;
  searchTerm$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.searchResults$ = store.select(fromRoot.getSearchResults);
    this.searching$ = store.select(fromRoot.getSearchLoading);
    this.searchTerm$ = store.select(fromRoot.getSearchQuery);
  }
}
