import { Component, Input } from '@angular/core';

import { DiscogsRelease } from '../../models';

@Component({
  selector: 'app-release-preview',
  templateUrl: './release-preview.component.html',
  styleUrls: ['./release-preview.component.css']
})
export class ReleasePreviewComponent {
  @Input() releases: DiscogsRelease[];
}
