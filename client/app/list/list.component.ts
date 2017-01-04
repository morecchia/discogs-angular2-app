import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription }   from 'rxjs/Subscription';

import { LocalStorageService } from 'angular-2-local-storage';

import { DiscogsService } from '../../services/discogs.service';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items = [];
  listType: string;

  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;

  private _sub: Subscription;
  private _searchSubscription: Subscription;
  private _listSubscription: Subscription;

  constructor(private discogs: DiscogsService, private localStorage: LocalStorageService,
    private youtube: YoutubeService, private route: ActivatedRoute) {
      this._searchSubscription = discogs.search$
        .subscribe(response => {
          this.listType = 'searchResult';
          this._setListdata(response.json());
        });

      this._listSubscription = discogs.list$
        .subscribe(response => {
          this.listType = 'wantlist';
          this._setListdata(response.json());
        });
    }

  getList(type: string, page = 1): void {
    if (page) {
      this.localStorage.set(`${type}-page`, page);
    }

    this.items = [];
    this.currentPage = page;

    if (this.discogs.searchTerm) {
      this.discogs.searchReleases(this.discogs.searchTerm, page);
      return;
    }

    this.discogs.getListByType(type, page)
      .subscribe(response => {
        this._setListdata(response.json());
      });
  }

  getPage(page: number) {
    this.getList(this.listType, page);
  }

  playAll(release: any) {
    this.youtube.playAll(release, video => {
      this.localStorage.set('activeVideo', video);
    });
  }

  private _setListdata(data: any) {
    this.currentPage = data.pagination.page;
    this.totalItems = data.pagination.items;
    this.items = data.wants || data.releases || data.listings || data.results;
    this.discogs.releaseList = this.items;
  }

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      this.listType = this.discogs.searchTerm
        ? 'searchResult' : params['type'] || 'wantlist';
      const activePage = this.localStorage.get(`${this.listType}-page`) as number;
      this.getList(this.listType, activePage);
    });
  }
}
