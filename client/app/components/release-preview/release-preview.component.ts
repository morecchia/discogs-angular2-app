import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as player from '../../actions/player';

import { DiscogsRelease } from '../../models';

@Component({
  selector: 'app-release-preview',
  templateUrl: './release-preview.component.html',
})
export class ReleasePreviewComponent {
  @Input() release: DiscogsRelease;

  playAll(release: DiscogsRelease) {
    this.store.dispatch(new player.LoadReleaseAction(this.release.id));
  }

  constructor(private store: Store<fromRoot.State>) { }
}
