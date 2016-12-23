import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';

import { DiscogsService } from '../../services/discogs.service';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  releases: any[];
  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;

  constructor(private discogs: DiscogsService, private localStorage: LocalStorageService,
    private youtube: YoutubeService) { }

  getCollection(page = 1): void {
    if (page) {
      this.localStorage.set('collectionPage', page);
    }

    this.releases = [];
    this.currentPage = page;
    this.discogs.getCollection(page)
      .subscribe(response => {
        const data = response.json();
        this.currentPage = data.pagination.page;
        this.totalItems = data.pagination.items;
        this.releases = data.releases;
      });
  }

  playAll(id: number) {
    this.youtube.playAll(id, video => {
      this.localStorage.set('activeVideo', video);
    });
  }

  ngOnInit() {
    const activePage = this.localStorage.get('collectionPage') as number;
    this.getCollection(activePage);
  }
}
