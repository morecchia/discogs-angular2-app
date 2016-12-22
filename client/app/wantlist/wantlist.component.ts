import { Component, OnInit, EventEmitter } from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';

import { LocalStorageService } from 'angular-2-local-storage';

import { DiscogsService } from '../../services/discogs.service';
import { YoutubeService } from '../../services/youtube.service';

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

  constructor(private discogs: DiscogsService, private localStorage: LocalStorageService,
    private youtube: YoutubeService) { }

  getWantlist(page = 1): void {
    if (page) {
      this.localStorage.set('wantlistPage', page);
    }

    this.releases = [];
    this.currentPage = page;
    this.discogs.getWantlist(page)
      .subscribe(response => {
        const data = response.json();
        this.currentPage = data.pagination.page;
        this.totalItems = data.pagination.items;
        this.releases = data.wants;
      });
  }

  playAll(id: number) {
    this.discogs.getRelease(id)
      .map(release => {
        const videoList = release.json().videos;
        return videoList ? videoList.map(v => v.uri) : [];
      })
      .subscribe(urls => {
        this.youtube.oEmbed(urls)
          .subscribe(videos => {
            this.youtube.publishVideos(videos);
            this.youtube.selectVideo(videos[0]);
          });
      });
  }

  ngOnInit() {
    const activePage = this.localStorage.get('wantlistPage') as number;
    this.getWantlist(activePage);
  }
}
