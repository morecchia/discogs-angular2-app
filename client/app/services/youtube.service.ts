import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';

import { LocalStorageService } from 'angular-2-local-storage';

import * as YouTubePlayer from 'youtube-player';

import * as fromRoot from '../reducers';
import * as player from '../actions/player';

import { DiscogsService } from './discogs.service';
import { YoutubeResponse, YoutubeVideo, Video } from '../models';

import * as moment from 'moment';

export const YT_REGEXES = [
  /https?:\/\/(?:www\.)?youtube\.com\/.*?v=(.*)$/,
  /https?:\/\/youtu\.be\/(.*)/
];

export enum YTPLAYER_STATE {
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5
}

export function formatDuration(span: any) {
  const spanSeconds = span.seconds();
  const seconds = spanSeconds < 10 ? `0${spanSeconds}` : spanSeconds;
  return `${span.minutes()}:${seconds}`;
}

@Injectable()
export class YoutubeService {

  player = YouTubePlayer('youtube-player');

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
      });

      this.player.on('stateChange', event => {
        switch (event.data) {
          case YTPLAYER_STATE.ENDED:
            console.log('Youtube: ended');
            this.store.dispatch(new player.PlayNextAction());
            break;
          case YTPLAYER_STATE.PLAYING:
            console.log('Youtube: playing');
            break;
          case YTPLAYER_STATE.BUFFERING:
            console.log('Youtube: buffering');
            break;
        }
      });
  }

  playerTime(video: YoutubeVideo, startTime = 0) {
    const ms = startTime * 1000;
    const startSpan = moment.duration(startTime, 'seconds');
    const trackDuration = moment
      .duration(video && video.contentDetails.duration)
      .asMilliseconds();

    return Observable
      .timer(0, 1000)
      .map(t => {
        const span = moment.duration(startTime + t, 'seconds');
        return {
          formatted: formatDuration(span),
          seconds: span.asSeconds()
        };
      });
  }

  constructor(private http: Http, private discogs: DiscogsService,
    private localStorage: LocalStorageService, private store: Store<fromRoot.State>) { }
}
