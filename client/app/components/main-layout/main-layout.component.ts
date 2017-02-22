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

    searchVisible = false;

    title = 'Discogs Player';

    toggleSearch() {
      this.searchVisible = !this.searchVisible;
    }

    onSearch(query: string) {
      this.store.dispatch(new search.SearchReleasesAction({query, page: 1}));
      this.router.navigate(['/search', query]);
    }

    constructor(private store: Store<fromRoot.State>, private router: Router) { }
}
