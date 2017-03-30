import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';

import { LocalStorageService } from 'angular-2-local-storage';

import * as YouTubePlayer from 'youtube-player';

import * as fromRoot from '../reducers';
import * as playerActions from '../actions/player';

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

  playerSettings: any;
  player: any;

  getListData(ids: string[]): Observable<models.YoutubeResponse> {
    return this.http.post('/api/videos', {ids})
      .map(response => response.json());
  }

  getIdFromUrl(url): string {
    return url.match(YT_REGEXES[0])[1] || url.match(YT_REGEXES[1])[1];
  }

  setVolume(value: number, store = true) {
    if (this.player) {
      this.player.setVolume(value);
    }

    if (store) {
      this.localStorage.set('playerVolume', value);
    }
  }

  getStoredVolume(): number {
    return this.localStorage.get('playerVolume') as number;
  }

  setSelectedVideo(selected: models.SelectedVideo) {
    this.localStorage.set('activeVideo', selected);
  }

  getPlayerSettings(): models.PlayerSettings {
    this.playerSettings = {
      volume: this.localStorage.get('playerVolume') as number || 50,
      activeVideo: this.localStorage.get('activeVideo') as models.SelectedVideo,
    };

    return this.playerSettings;
  }

  setPlaylist(videos: models.SelectedVideo[]) {
    this.localStorage.set('playerVideos', videos || []);
  }

  getPlaylist(): models.SelectedVideo[] {
    return this.localStorage.get('playerVideos') as models.SelectedVideo[] || [];
  }

  initPlayer(id?: string) {
    this.player = YouTubePlayer('youtube-player', {
      playerVars: {
         'autoplay': 0,
         'controls': 0,
         'rel' : 0
      }
    });
    const videoId = id || this.playerSettings.activeVideo
        && this.playerSettings.activeVideo.video.id;
    this.player.on('ready', event => {
      this.player.loadVideoById(videoId);
    });

    this.player.on('stateChange', event => {
      switch (event.data) {
        case YTPLAYER_STATE.ENDED:
          this._playbackEndedSubject.next();
          break;
        case YTPLAYER_STATE.PLAYING:
          break;
        case YTPLAYER_STATE.PAUSED:
          this.store.dispatch(new playerActions.TogglePlayAction(false));
          break;
        case YTPLAYER_STATE.BUFFERING:
          break;
      }
    });

    this.player.on('error', event => {
      console.warn(event);
      this.store.dispatch(new playerActions.InitFailAction(event.data));
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

  constructor(private http: Http, private localStorage: LocalStorageService,
    private store: Store<fromRoot.State>) { }
}
