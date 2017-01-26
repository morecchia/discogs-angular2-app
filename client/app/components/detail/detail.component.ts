import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Subscription }   from 'rxjs/Subscription';

import { LocalStorageService } from 'angular-2-local-storage';
import { MdlSnackbarService } from 'angular2-mdl';

import { DiscogsService } from '../../services/discogs.service';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  details: any;
  currentId: number;
  videos: any[];
  videosLoaded: boolean;
  activeVideoId: number;
  wantlistItems: number[];
  itemInWantlist: boolean;

  activeVideoSubscription: Subscription;
  wantlistItemsSubscription: Subscription;

  private _sub: any;

  constructor(private discogs: DiscogsService, private youtube: YoutubeService,
   private route: ActivatedRoute, private localStorage: LocalStorageService,
   private mdlSnackbarService: MdlSnackbarService) {
      this.activeVideoSubscription = youtube.videoActivated$
        .subscribe(video => {
          this.activeVideoId = video.id;
          this.localStorage.set('activeVideo', video);
        });

      this.wantlistItemsSubscription = this.discogs.wantlistItems$
        .subscribe(ids => {
          this.wantlistItems = ids;
        });
    }

  getDetailById(id: number) {
    this.discogs.getRelease(id)
      .catch(err => this.errorHandler(err))
      .mergeMap(release => {
        this.details = {type: 'release', info: release};
        const urls =  release.videos
          ? release.videos.map(v => this.youtube.getIdFromUrl(v.uri)) : [];
        return this.youtube.getListData(urls);
      })
      .catch(err => Observable.throw(err))
      .subscribe(response => {
        this.videos = response.json().items;
        this.youtube.publishVideos({releaseInfo: this.details.info, items: this.videos});
        this.videosLoaded = true;
      });
  }

  selectVideo(video: any, releaseInfo: any) {
    video.discogsId = releaseInfo.id;
    video.discogsTitle = releaseInfo.title;
    this.activeVideoId = video.id;
    this.youtube.selectVideo(video);
    this.localStorage.set('activeVideo', video);
  }

  addToWantlist(id: number) {
    this.discogs.putWantlist(id)
      .catch(err => Observable.throw(err))
      .subscribe(result => {
        this.discogs.wantlistItems.push(id);
        this.localStorage.set('wantlist_ids', this.discogs.wantlistItems);
        this.itemInWantlist = true;
        this.showActionMsg(`Added "${result.basic_information.title}" to wantlist.`);
      });
  }

  removeFromWantlist(id: number, title: string) {
    this.discogs.deleteWantlist(id)
      .catch(err => Observable.throw(err))
      .subscribe(() => {
        const items = this.discogs.wantlistItems;
        const index = items.findIndex(i => i == id);
        const deletedId = items.splice(index, 1);
        this.localStorage.set('wantlist_ids', items);
        this.itemInWantlist = false;
        this.showActionMsg(`Removed "${title}" from wantlist.`)
      });
  }

  showActionMsg(message: string, timeout = 2000 ) {
    this.mdlSnackbarService.showSnackbar({ message, timeout });
  }

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.itemInWantlist = this.discogs.wantlistItems.findIndex(i => i == id) > -1;
        this.getDetailById(id);
      }
    });

    const activeVideo = this.localStorage.get('activeVideo') as any;
    this.activeVideoId = activeVideo && activeVideo.id;
  }

  errorHandler(err): Observable<any> {
    this.details = {type: 'error', info: {message: 'There was an error.  Try again later.'}};
    return Observable.throw(err);
  }
}
