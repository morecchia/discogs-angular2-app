import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnDestroy {
  placeholder = 'Type the name of a release...';

  @Input()
  searchTerm: string;

  @Output()
  onSearch = new EventEmitter<string>();

  ngOnDestroy() {
    // this.discogs.deactivateSearch();
  }

  constructor(private store: Store<fromRoot.State>) { }
}
