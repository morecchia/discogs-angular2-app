import { Component, OnInit, Input } from '@angular/core';

import { DiscogsService } from '../../services/discogs.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Input()
  placeholder: string = 'Type the name of a release...';
  constructor(private discogs: DiscogsService) { }

  clear(input) {
    input.value = '';
  }

  onFocus(value) {
  }

  onBlur(value) {
  }

  onInput(q: string) {
      this.discogs.searchReleases(q);
  }

  ngOnInit() {
  }
}
