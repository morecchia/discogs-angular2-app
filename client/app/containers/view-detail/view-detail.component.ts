import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import '@ngrx/core/add/operator/select';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../reducers';
import * as release from '../../actions/release';
import { DiscogsRelease } from '../../models';
import { DiscogsService } from '../../services';

@Component({
  selector: 'app-view-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-detail.component.html'
})
export class ViewDetailComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('id')
      .map(id => new release.LoadAction(id))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
