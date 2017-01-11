import { Component, OnInit } from '@angular/core';
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
export class DetailComponent implements OnInit {
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
      .mergeMap(release => {
        const fullDetails = release.json();
        console.log(fullDetails);
        this.details = {type: 'release', info: fullDetails};
        const urls =  fullDetails.videos
          ? fullDetails.videos.map(v => this.youtube.getIdFromUrl(v.uri)) : [];
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

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
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
