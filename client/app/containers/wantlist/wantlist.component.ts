import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../reducers';
import * as user from '../../actions/user';
import * as wantlistActions from '../../actions/wantlist';

import { SnackbarService } from '../../services';
import { DiscogsWants, Playlist } from '../../models';

@Component({
  selector: 'app-wantlist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wantlist.component.html',
})
export class WantlistComponent {
  wantlist$: Observable<DiscogsWants>;
  playlists$: Observable<Playlist[]>;
  loading$: Observable<boolean>;
  currentPage$: Observable<number>;

  actionsSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private router:  Router, private activatedRoute: ActivatedRoute,
    private location: Location, private snackbar: SnackbarService) {
      this.wantlist$ = store.select(fromRoot.getWantlist);
      this.playlists$ = store.select(fromRoot.getPlaylists);
      this.currentPage$ = store.select(fromRoot.getWantlistPage);
      this.loading$ = store.select(fromRoot.getWantlistLoading);

      this.actionsSubscription = activatedRoute.params
        .map(() => new wantlistActions.LoadAction())
        .subscribe(store);

      store.select(fromRoot.getWantlistFailed)
        .subscribe(error => {
          if (error) {
            this.snackbar.showError(error.message);
            store.dispatch(new user.LogoutAction());
          }
        });
    }
}
