import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { DiscogsService } from '../../services/discogs.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input()
  placeholder: string = 'Type the name of a release...';

  constructor(private discogs: DiscogsService) { }

  onInput(q: string) {
    this.discogs.searchReleases(q);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.discogs.deactivateSearch();
  }
}
