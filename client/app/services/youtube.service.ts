import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';

import { LocalStorageService } from 'angular-2-local-storage';

import * as YouTubePlayer from 'youtube-player';

import * as fromRoot from '../reducers';
import * as player from '../actions/player';

import { DiscogsService } from './discogs.service';
import * as models from '../models';

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
  private _playbackEndedSubject = new Subject<any>();
  playbackEnded$ = this._playbackEndedSubject.asObservable();

  player = YouTubePlayer('youtube-player');

  getListData(ids: string[]): Observable<models.YoutubeResponse> {
    return this.http.post('/api/videos', {ids})
      .map(response => response.json());
  }

  getIdFromUrl(url): string {
    return url.match(YT_REGEXES[0])[1] || url.match(YT_REGEXES[1])[1];
  }

  setActiveVideo(video: any) {
    this.localStorage.set('activeVideo', video);
  }

  setVolume(value: number) {
    this.player.setVolume(value);
    this.localStorage.set('playerVolume', value);
  }

  setSelectedVideo(selected: models.SelectedVideo) {
    this.localStorage.set('activeVideo', selected.video);
    this.localStorage.set('activeRelease', selected.release);
  }

  getPlayerSettings(): models.PlayerSettings {
    return {
      volume: this.localStorage.get('playerVolume') as number,
      activeVideo: this.localStorage.get('activeVideo') as models.YoutubeVideo,
      activeRelease: this.localStorage.get('activeRelease') as models.DiscogsRelease
    };
  }

  initPlayer(volume: number) {
    this.player.on('ready', event => {
      console.log('Youtube ready');
      this.player.setVolume(volume);
    });

    this.player.on('stateChange', event => {
      switch (event.data) {
        case YTPLAYER_STATE.ENDED:
          this._playbackEndedSubject.next();
          break;
        case YTPLAYER_STATE.PLAYING:
          console.log('Youtube playing');
          break;
        case YTPLAYER_STATE.BUFFERING:
          console.log('Youtube buffering');
          break;
      }
    });
  }

  playerTime(startTime: models.StartTime): Observable<models.PlayerTime> {
    const ms = startTime.seconds * 1000;

    if (!startTime.duration) {
      const span = moment.duration(startTime, 'seconds');
      return Observable.of({
        formatted: formatDuration(span),
        seconds: span.asSeconds()
      });
    }

    const trackDuration = moment
      .duration(startTime.duration)
      .asMilliseconds() + 1000;

    return Observable
      .timer(0, 1000)
      .takeUntil(Observable.timer((trackDuration) - ms))
      .map(t => {
        const span = moment.duration(startTime.seconds + t, 'seconds');
        return {
          formatted: formatDuration(span),
          seconds: span.asSeconds()
        };
      });
  }

  constructor(private http: Http, private discogs: DiscogsService,
    private localStorage: LocalStorageService, private store: Store<fromRoot.State>) { }
}
