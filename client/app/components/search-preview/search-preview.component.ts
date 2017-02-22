import { Component, Input } from '@angular/core';

import { DiscogsSearchResult } from '../../models';

@Component({
  selector: 'app-search-preview',
  templateUrl: './search-preview.component.html'
})
export class SearchPreviewComponent {
  @Input()
  result: DiscogsSearchResult;
}
