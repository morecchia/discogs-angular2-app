import { Component, OnInit, EventEmitter } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { DiscogsService } from '../../services/discogs.service';

@Component({
  selector: 'app-wantlist',
  templateUrl: './wantlist.component.html',
  styleUrls: ['./wantlist.component.css']
})
export class WantlistComponent implements OnInit {
  releases: any[];
  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 25;

  constructor(private discogs: DiscogsService) { }

  getWantlist(page: number = 1): void {
    this.currentPage = page;
    this.discogs.getWantlist(page)
      .subscribe(response => {
        const data = response.json();
        this.currentPage = data.pagination.page;
        this.totalItems = data.pagination.items;
        this.releases = data.wants;
      });
  }

  ngOnInit() {
    this.getWantlist();
  }
}
