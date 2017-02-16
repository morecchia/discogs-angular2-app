import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable }   from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { DiscogsUser } from '../../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user$: Observable<DiscogsUser>;

  constructor(private store: Store<fromRoot.State>) {
    this.user$ = store.select(fromRoot.getUser);
  }
}
