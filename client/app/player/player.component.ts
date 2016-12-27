import { Component, OnInit, Inject, Input } from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';
import { LocalStorageService } from 'angular-2-local-storage';
import * as YouTubePlayer from 'youtube-player';

import { YoutubeService } from '../../services/youtube.service';
import { DiscogsService } from '../../services/discogs.service';

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

  @Input()
  lastVideo: any;

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
    this.playing = true;
  }

  pauseVideo() {
    this.player.pauseVideo();
    this.playing = false;
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
        .then(current => this.player.seekTo(current + 5));
    }
  }

  seekRw() {
    if (this.player && this.playing) {
      this.player.getCurrentTime()
        .then(current => this.player.seekTo(current - 5));
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
    });

    this.player.on('stateChange', event => {
      const nextVideo = this._getNextVideo();
      if (event.data === 0 && nextVideo) {
        this.player.loadVideoById(nextVideo.id);
        this.youtube.activateVideo(nextVideo);

        this.selectedVideo = nextVideo;
        this.selectedVideo.discogsId = this.videos.releaseInfo.id;
        this.selectedVideo.discogsTitle = this.videos.releaseInfo.title;

      }
    });

    this.player.loadVideoById(video.id);
    this.youtube.activateVideo(video);

    this.selectedVideo = video;
    this.playing = true;
  }

  ngOnInit() {
    this.selectedVideo = this.lastVideo;

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
