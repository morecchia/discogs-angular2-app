import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { DiscogsService } from '../../services/discogs.service';

@Component({
  selector: 'app-wantlist',
  templateUrl: './wantlist.component.html',
  styleUrls: ['./wantlist.component.css']
})
export class WantlistComponent implements OnInit {
  releases: any[];

  constructor(private discogs: DiscogsService) { }

  getWantlist(): void {
    this.discogs.getWantlist()
      .subscribe(response => {
        this.releases = response.json().wants;
      });
  }

  ngOnInit() {
    this.getWantlist();
  }
}
