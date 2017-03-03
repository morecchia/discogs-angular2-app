import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as search from '../../actions/search';

import { DiscogsUser } from '../../models';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
    @Input()
    user: DiscogsUser;

    @Input()
    videoSelected: boolean;

    @Input()
    videoLoadFailed: boolean;

    searchVisible = false;

    title = 'Discogs Player';

    toggleSearch() {
      this.searchVisible = !this.searchVisible;
    }

    onSearch(e) {
      if (goodKey(e)) {
        this.store.dispatch(new search.SearchReleasesAction({query: e.target.value, page: 1}));
      }
    }

    constructor(private store: Store<fromRoot.State>, private router: Router) { }
}

function goodKey(e) {
  return e.which > 40 || e.keyCode === 13 || !e.ctrlKey || !e.altKey || !e.metaKey;
}
