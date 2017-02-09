import { Component, Input } from '@angular/core';

import { DiscogsRelease } from '../../models';

@Component({
  selector: 'app-release-preview',
  templateUrl: './release-preview.component.html',
})
export class ReleasePreviewComponent {
  @Input() release: DiscogsRelease;
}
