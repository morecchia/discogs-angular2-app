import { Component, OnInit, Inject, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
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
  private get _currentDuration(): string { return this.selectedVideo.contentDetails.duration; }
  get currentDurationSeconds(): number { return moment.duration(this._currentDuration).asSeconds(); }

  player: any;
  playing: boolean;
  selectedVideo: any;
  videos: any = {};
  volume: number;

  playerFrameVisible: boolean;
  volumeVisible: boolean;
  imageIconVisible: boolean;

  currentTime: Observable<string>;
  currentTimeSeconds: number = 0;

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

    this.currentTime = this._timer(this._currentDuration, this.currentTimeSeconds);
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

  seekTo(time: number) {
    if (!this.playing) {
      this._launchYoutubePlayer(this.selectedVideo);
    }

    this.player.seekTo(time);
  }

  seekFw() {
    if (!this.player || !this.playing) {
      return;
    }

    this.player.getCurrentTime()
      .then(current => {
        const remaining = this.currentDurationSeconds - current;
        const seekVal = remaining < 5 ? current + remaining : current + 5;

        this.player.seekTo(seekVal);
        this.currentTime = this._timer(this._currentDuration, seekVal);
      });
  }

  seekRw() {
    if (!this.player || !this.playing) {
      return;
    }

    this.player.getCurrentTime()
      .then(current => {
        const fromStart = current - moment.duration(this.currentTimeSeconds).asSeconds();
        const seekVal = fromStart < 5 ? current - fromStart : current - 5;

        if (current > 0) {
          this.player.seekTo(seekVal);
          this.currentTime = this._timer(this._currentDuration, seekVal);
        }
      });
  }

  skipNext() {
    const nextVideo = this._skipVideo();

    // if (!nextVideo) {
    //   this._playNextRelease();
    //   return;
    // }
  }

  skipPrev() {
    this._skipVideo(true);
  }

  togglePlayerFrame() {
    this.playerFrameVisible = !this.playerFrameVisible;
  }

  toggleImgIcon(hidden = false) {
    this.imageIconVisible = !hidden;
  }

  toggleVolumeVisibility(hidden = false) {
    setTimeout(() => {
      this.volumeVisible = !hidden;
    }, 200);
  }

  toggleVolume() {
    const storedVolume = this.localStorage.get('playerVolume') as number || 50;
    this.volume = this.volume === 0 ? storedVolume : 0;

    if (this.player) {
      this.player.setVolume(this.volume);
    }
  }

  private _skipVideo(prev = false) {
    const video = this._getNextVideo(prev);

    if (!video) {
      return null;
    }

    video.discogsId = this.videos.releaseInfo.id;
    video.discogsTitle = this.videos.releaseInfo.title
      || this.videos.releaseInfo.basic_information.title;

    this._launchYoutubePlayer(video);
    return video;
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

    this._attachPlayerEvents();
    this._selectVideo(video);
  }

  private _attachPlayerEvents() {
    this.player.on('ready', event => {
      event.target.setVolume(this.volume);
      this.currentTime = this._timer(this._currentDuration);
    });

    this.player.on('stateChange', event => {
      switch (event.data) {
        case 0:
          this._tryNextVideo();
          break;
        case 1:
          this.player.getCurrentTime()
            .then(time => {
              this.currentTime = this._timer(this._currentDuration, time);
            });
          break;
        case 3:
          this.currentTime = Observable.of(
            formatDuration(moment.duration(this.currentTimeSeconds, 'seconds'))
          );
          break;
      }
    });

    this.player.on('error', event => {
      this._tryNextVideo();
    });
  }

  private _tryNextVideo() {
    const nextVideo = this._getNextVideo();

    // if (!nextVideo) {
    //   this._playNextRelease();
    //   return;
    // }

    this._selectVideo(nextVideo);

    this.selectedVideo.discogsId = this.videos.releaseInfo.id;
    this.selectedVideo.discogsTitle = this.videos.releaseInfo.title;
    this.currentTime = this._timer(this._currentDuration);
  }

  // private _playNextRelease() {
  //   const nextRelease = this.discogs.getNextRelease(this.videos.releaseInfo.id);
  //   this.youtube.playAll(nextRelease, video => {
  //     if (!video) {
  //       this._playNextRelease();
  //       this.currentTime = null;
  //     }
  //   });
  // }

  private _selectVideo(video: any) {
    this.player.loadVideoById(video.id);
    this.youtube.activateVideo(video);

    this.selectedVideo = video;
    this.playing = true;
  }

  private _timer(duration: string, startTime = 0) {
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
