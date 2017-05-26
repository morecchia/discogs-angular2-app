import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';

import * as fromRoot from '../../reducers';
import * as search from '../../actions/search';
import { DiscogsSearch, Playlist } from '../../models';

@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html'
})
export class SearchComponent {
  searchResults$: Observable<DiscogsSearch>;
  searching$: Observable<boolean>;
  searchTerm$: Observable<string>;
  currentPage$: Observable<number>;
  playlists$: Observable<Playlist[]>;

  routeParamSub: Subscription;

  constructor(private store: Store<fromRoot.State>, private activatedRoute: ActivatedRoute) {
    this.searchResults$ = store.select(fromRoot.getSearchResults);
    this.searching$ = store.select(fromRoot.getSearchLoading);
    this.searchTerm$ = store.select(fromRoot.getSearchQuery);
    this.currentPage$ = store.select(fromRoot.getSearchPage);
    this.playlists$ = store.select(fromRoot.getPlaylists);

    this.routeParamSub = activatedRoute.params
      .subscribe(params => {
        const query = params['q'];
        this.store.dispatch(new search.SearchReleasesAction({query, page: 1}));
      });
  }
}
