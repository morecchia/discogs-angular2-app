import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable, Subject } from 'rxjs';

import { LocalStorageService } from 'angular-2-local-storage';

import * as YouTubePlayer from 'youtube-player';

import { DiscogsService } from './discogs.service';
import { YoutubeResponse, Video } from '../models';

import * as moment from 'moment';

const YT_REGEXES = [
  /https?:\/\/(?:www\.)?youtube\.com\/.*?v=(.*)$/,
  /https?:\/\/youtu\.be\/(.*)/
];

export function formatDuration(span: any) {
  const spanSeconds = span.seconds();
  const seconds = spanSeconds < 10 ? `0${spanSeconds}` : spanSeconds;
  return `${span.minutes()}:${seconds}`;
}

@Injectable()
export class YoutubeService {
  currentDuration: string;

  player = YouTubePlayer('player');
  currentTimeSeconds: number = 0;
  currentTime: Observable<string>;

  getListData(ids: string[]): Observable<any> {
    return this.http.post('/api/videos', {ids})
      .map(response => response.json());
  }

  getIdFromUrl(url): string {
    return url.match(YT_REGEXES[0])[1] || url.match(YT_REGEXES[1])[1];
  }

  publishVideos(videos: any) {
  }

  setActiveVideo(video: any) {
    this.localStorage.set('activeVideo', video);
  }

  playAll(release: any, callback: (video: any) => void) {
    if (!release) {
      return;
    }

    this.discogs.getRelease(release.id)
      .mergeMap(response => {
        const videoList = response.json().videos;
        const urls = videoList
          ? videoList.map(v => this.getIdFromUrl(v.uri)) : [];
        return this.getListData(urls);
      })
      .subscribe(response => {
        const videos = response.json().items;
        this.publishVideos({releaseInfo: release, items: videos});

        const video = videos[0];

        if (video) {
          video.discogsId = release.id;
          video.discogsTitle = release.title || release.basic_information.title;

          this.setActiveVideo(video);
        }

        callback(video);
      });
  }

  timer(duration: string, startTime = 0) {
    const startWithTime = formatDuration(moment.duration(startTime, 'seconds'));
    const trackDuration = moment.duration(duration).asMilliseconds() + 1000;
    return Observable.timer(0, 1000)
      .takeUntil(Observable.timer(trackDuration))
      .map(t => {
        const span = moment.duration(startTime + t, 'seconds');
        this.currentTimeSeconds = span.asSeconds();
        return formatDuration(span);
      })
      .startWith(startWithTime);
  }

  tryNextVideo() {
    this.currentTime = this.timer(this.currentDuration);
  }

  private _selectVideo(video: any) {
    this.player.loadVideoById(video.id);
    this.setActiveVideo(video);
  }

  constructor(private http: Http, private discogs: DiscogsService,
    private localStorage: LocalStorageService) { }
}
