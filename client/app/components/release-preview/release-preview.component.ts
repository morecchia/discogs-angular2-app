import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as discogs from '../../actions/release';

import { DiscogsRelease } from '../../models';

@Component({
  selector: 'app-release-preview',
  templateUrl: './release-preview.component.html',
})
export class ReleasePreviewComponent {
  @Input() release: DiscogsRelease;

  playAll() {
    this.store.dispatch(new discogs.LoadPlayerAction(this.release.id));
  }

  addToQueue() { }

  constructor(private store: Store<fromRoot.State>) { }
}
