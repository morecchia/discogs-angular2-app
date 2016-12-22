import { Component, OnInit, OnDestroy, Output, Inject, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Subscription }   from 'rxjs/Subscription';

import { LocalStorageService } from 'angular-2-local-storage';

import { DiscogsService } from '../../services/discogs.service';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  details: any;
  videos: any[];
  videosLoaded: boolean;
  activeVideoId: number;

  activeVideoSubscription: Subscription;

  private _sub: any;

  constructor(private discogs: DiscogsService, private youtube: YoutubeService,
   private route: ActivatedRoute, private localStorage: LocalStorageService) {
      this.activeVideoSubscription = youtube.videoActivated$
        .subscribe(video => {
          this.activeVideoId = video.id;
          this.localStorage.set('activeVideo', video);
        });
    }

  getDetailById(id: number) {
    this.discogs.getRelease(id)
      .catch(err => this.errorHandler(err))
      .map(release => {
        const fullDetails = release.json();
        this.details = {type: 'release', info: fullDetails};
        return fullDetails.videos
          ? fullDetails.videos.map(v => this.youtube.getIdFromUrl(v.uri)) : [];
      })
      .subscribe(urls => {
        this.youtube.oEmbed(urls)
          .catch(err => Observable.throw(err))
          .subscribe(response => {
            this.videos = response.json().items;
            this.youtube.publishVideos(this.videos);
            this.videosLoaded = true;
          });
      });
  }

  selectVideo(video) {
    this.activeVideoId = video.id;
    this.youtube.selectVideo(video);
    this.localStorage.set('activeVideo', video);
  }

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getDetailById(id);
      }
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  errorHandler(err): Observable<any> {
    this.details = {type: 'error', info: {message: 'There was an error.  Try again later.'}};
    return Observable.throw(err);
  }
}
