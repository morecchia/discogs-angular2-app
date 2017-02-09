import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as wantlist from '../../actions/wantlist';
import * as fromRoot from '../../reducers';
import { DiscogsWants } from '../../models';

@Component({
  selector: 'app-want-preview-list',
  templateUrl: './want-preview-list.component.html'
})
export class WantPreviewListComponent {
  @Input()
  wantlist: DiscogsWants;

  currentPage = 1;

  get itemsPerPage() { return this.wantlist.pagination.per_page || 0; };
  get totalItems() { return this.wantlist.pagination.items || 0; };

  getPage(page: number) {
    this.wantlist.wants = [];
    this.currentPage = page;
    this.store.dispatch(new wantlist.LoadAction(page));
  }

  constructor(private store: Store<fromRoot.State>) { }
}
