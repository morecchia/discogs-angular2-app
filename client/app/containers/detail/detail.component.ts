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

@Component({
  selector: 'app-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnDestroy {
  release$: Observable<DiscogsRelease>;

  _sub: Subscription;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
    this._sub = route.params
      .select<string>('id')
      .map(id => new release.SelectAction(id))
      .subscribe(store);
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
