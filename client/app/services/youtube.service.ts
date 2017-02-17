import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable, Subject } from 'rxjs';

import { LocalStorageService } from 'angular-2-local-storage';

import * as YouTubePlayer from 'youtube-player';

import { DiscogsService } from './discogs.service';
import { YoutubeResponse, YoutubeVideo, Video } from '../models';

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

  player = YouTubePlayer('youtube-player');
  currentTimeSeconds = 0;
  currentTime: Observable<string>;

  getListData(ids: string[]): Observable<any> {
    return this.http.post('/api/videos', {ids})
      .map(response => response.json());
  }

  getIdFromUrl(url): string {
    return url.match(YT_REGEXES[0])[1] || url.match(YT_REGEXES[1])[1];
  }

  setActiveVideo(video: any) {
    this.localStorage.set('activeVideo', video);
  }

  initPlayer(video: YoutubeVideo) {
    this.player.on('ready', event => {
        event.target.setVolume(50);
        // this.currentTime = this.timer(this.currentDuration);
      });

      this.player.on('stateChange', event => {
        switch (event.data) {
          case 0:
            this.tryNextVideo();
            break;
          case 1:
            this.player.getCurrentTime()
              .then(time => {
                // this.currentTime = this.timer(this.currentDuration, time);
              });
            break;
          case 3:
            this.currentTime = Observable.of(
              formatDuration(moment.duration(this.currentTimeSeconds, 'seconds'))
            );
            break;
        }
      });
  }

  playerTime(video: YoutubeVideo, startTime = 0) {
    const startSpan = moment.duration(startTime, 'seconds');
    const trackDuration = moment
      .duration(video && video.contentDetails.duration)
      .asMilliseconds() + 1000;

    return Observable.timer(0, 1000)
      .takeUntil(Observable.timer(trackDuration))
      .map(t => {
        const span = moment.duration(startTime + t, 'seconds');
        return {
          formatted: formatDuration(span),
          seconds: span.asSeconds()
        };
      })
      .startWith({
        formatted: formatDuration(startSpan),
        seconds: startSpan.asSeconds()
      });
  }

  tryNextVideo() {
    // this.currentTime = this.timer(this.currentDuration);
  }

  private _selectVideo(video: any) {
    this.player.loadVideoById(video.id);
    this.setActiveVideo(video);
  }

  constructor(private http: Http, private discogs: DiscogsService,
    private localStorage: LocalStorageService) { }
}
