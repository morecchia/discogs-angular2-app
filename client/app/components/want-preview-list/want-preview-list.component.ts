import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as wantlist from '../../actions/wantlist';
import * as fromRoot from '../../reducers';
import { DiscogsWants, Playlist } from '../../models';

@Component({
  selector: 'app-want-preview-list',
  templateUrl: './want-preview-list.component.html'
})
export class WantPreviewListComponent {
  @Input()
  wantlist: DiscogsWants;

  @Input()
  playlists: Playlist[];

  @Input()
  currentPage = 1;

  @Input()
  loading: boolean;

  get itemsPerPage() { return this.wantlist.pagination.per_page || 0; };
  get totalItems() { return this.wantlist.pagination.items || 0; };

  getNextPage() {
    this.currentPage = this.currentPage + 1;
    this.store.dispatch(new wantlist.LoadAction(this.currentPage));
  }

  constructor(private store: Store<fromRoot.State>) { }
}
