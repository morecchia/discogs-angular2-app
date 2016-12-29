import { Component, OnInit, Inject, Input } from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from 'angular-2-local-storage';
import * as YouTubePlayer from 'youtube-player';

import { YoutubeService, formatDuration } from '../../services/youtube.service';
import { DiscogsService } from '../../services/discogs.service';

import * as moment from 'moment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  player: any;
  playing: boolean;
  selectedVideo: any;
  videos: any = {};
  volume: number;

  @Input() currentTime: Observable<string>;
  currentTimeSeconds: number;

  @Input() lastVideo: any;

  videoSubscription: Subscription;
  videoListSubscription: Subscription;

  constructor(private youtube: YoutubeService, private localStorage: LocalStorageService,
    private discogs: DiscogsService) {
      this.volume = this.localStorage.get('playerVolume') as number || 50;

      this.videoSubscription = youtube.videoSelected$
        .subscribe(video => {
          this.selectedVideo = video;
          this._launchYoutubePlayer(video);
        });

      this.videoListSubscription = youtube.videoList$
        .subscribe(videos => {
          this.videos = videos;
        });
    }

  resumeVideo() {
    if (!this.player) {
      this._initYouTubePlayer(this.selectedVideo);
      return;
    }

    this.player.playVideo();

    this.currentTime = this._timer(
      this.selectedVideo.contentDetails.duration, this.currentTimeSeconds);

    this.playing = true;
  }

  pauseVideo() {
    this.player.pauseVideo();
    this.playing = false;

    this.currentTime = Observable.of(
      formatDuration(moment.duration(this.currentTimeSeconds, 'seconds'))
    );
  }

  inputVolume(value) {
    if (this.player) {
      this.player.setVolume(value);
    }
  }

  changeVolume(value: number) {
    this.localStorage.set('playerVolume', value);
  }

  seekFw() {
    if (this.player && this.playing) {
      this.player.getCurrentTime()
        .then(current => {
          const remaining = moment.duration(this.selectedVideo.contentDetails.duration).asSeconds() - current;
          const seekVal = remaining < 5 ? current + remaining : current + 5;

          this.player.seekTo(seekVal);
          this.currentTime = this._timer(
            this.selectedVideo.contentDetails.duration, seekVal);
        });
    }
  }

  seekRw() {
    if (this.player && this.playing) {
      this.player.getCurrentTime()
        .then(current => {
          const fromStart = current - moment.duration(this.currentTimeSeconds).asSeconds();
          const seekVal = fromStart < 5 ? current - fromStart : current - 5;

          if (current > 0) {
            this.player.seekTo(seekVal);
            this.currentTime = this._timer(
              this.selectedVideo.contentDetails.duration, seekVal);
          }
        });
    }
  }

  skipNext() {
    this._skipVideo(false);
  }

  skipPrev() {
    this._skipVideo(true);
  }

  private _skipVideo(prev = false) {
    const video = this._getNextVideo(prev);
    if (video) {
      video.discogsId = this.videos.releaseInfo.id;
      video.discogsTitle = this.videos.releaseInfo.title
        || this.videos.releaseInfo.basic_information.title;

      this._launchYoutubePlayer(video);
    }
  }

  private _getNextVideo(skipPrev = false) {
    if (!this.selectedVideo || !this.videos) {
      return null;
    }

    const currentIndex = this.videos.items.map(v => v.id).indexOf(this.selectedVideo.id);

    if (skipPrev) {
      return this.videos.items.length && (this.videos.items.length > 1 || currentIndex !== 0)
        ? this.videos.items[currentIndex - 1]
        : null;
    }

    return this.videos.items.length && (this.videos.items.length > 1 || currentIndex !== this.videos.items.length)
      ? this.videos.items[currentIndex + 1]
      : null;
  }

  private _launchYoutubePlayer(video: any) {
    if (!video) {
      return;
    }

    if (this.player) {
      this.player.loadVideoById(video.id);
      this.youtube.activateVideo(video);

      this.selectedVideo = video;
      this.currentTime = this._timer(video.contentDetails.duration);
      this.playing = true;

      return;
    }

    this._initYouTubePlayer(video);
  }

  private _initYouTubePlayer(video: any) {
    if (!video) {
      return;
    }

    this.player = YouTubePlayer('player');

    this.player.on('ready', event => {
      event.target.setVolume(this.volume);
      this.currentTime = this._timer(video.contentDetails.duration);
    });

    this.player.on('stateChange', event => {
      if (event.data !== 0) {
        return;
      }

      const nextVideo = this._getNextVideo();

      if (!nextVideo) {
        this.currentTime = null;
        return;
      }

      this.player.loadVideoById(nextVideo.id);
      this.youtube.activateVideo(nextVideo);

      this.selectedVideo = nextVideo;
      this.selectedVideo.discogsId = this.videos.releaseInfo.id;
      this.selectedVideo.discogsTitle = this.videos.releaseInfo.title;

      this.currentTime = this._timer(video.contentDetails.duration);
    });

    this.player.loadVideoById(video.id);
    this.youtube.activateVideo(video);

    this.selectedVideo = video;
    this.playing = true;
  }

  private _timer(duration, startTime = 0) {
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

  ngOnInit() {
    this.selectedVideo = this.lastVideo;

    if (!this.selectedVideo) {
      return;
    }

    let releaseInfo;
    this.discogs.getRelease(this.selectedVideo.discogsId)
      .mergeMap(response => {
        releaseInfo = response.json();
        const videoList = releaseInfo.videos;
        const urls = videoList
          ? videoList.map(v => this.youtube.getIdFromUrl(v.uri)) : [];
        return this.youtube.getListData(urls);
      })
      .subscribe(response => {
        this.videos.releaseInfo = releaseInfo;
        this.videos.items = response.json().items;
      });
  }
}
