import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { DiscogsRelease } from '../../models';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.css']
})
export class ReleaseDetailComponent {
  @Input()
  release: DiscogsRelease;

  get currentId(): number { return this.release.id; }
}
