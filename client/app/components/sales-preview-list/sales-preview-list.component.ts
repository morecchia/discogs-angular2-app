import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as sales from '../../actions/sales';
import * as fromRoot from '../../reducers';
import { DiscogsSales, Playlist } from '../../models';

@Component({
  selector: 'app-sales-preview-list',
  templateUrl: './sales-preview-list.component.html'
})
export class SalesPreviewListComponent {
  @Input()
  sales: DiscogsSales;

  @Input()
  playlists: Playlist[];

  @Input()
  loading: boolean;

  @Input()
  currentPage = 1;

  get itemsPerPage() { return this.sales.pagination.per_page || 0; };
  get totalItems() { return this.sales.pagination.items || 0; };

  getPage(page: number) {
    this.currentPage = page;
    this.store.dispatch(new sales.LoadAction(page));
  }

  constructor(private store: Store<fromRoot.State>) { }
}
