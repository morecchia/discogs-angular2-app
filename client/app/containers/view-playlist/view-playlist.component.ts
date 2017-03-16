import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import '@ngrx/core/add/operator/select';

import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../reducers';
import * as playlist from '../../actions/playlist';

@Component({
  selector: 'app-view-playlist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-playlist.component.html'
})
export class ViewPlaylistComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('id')
      .map(id => new playlist.ViewAction(id))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
