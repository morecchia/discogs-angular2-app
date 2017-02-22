import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import '@ngrx/core/add/operator/select';

import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../reducers';
import * as search from '../../actions/search';

@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('q')
      .map(q => new search.LoadResultsAction(q))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
