import { Component, OnInit, Inject, Input } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { Subscription }   from 'rxjs/Subscription';
import { LocalStorageService } from 'angular-2-local-storage';
import * as YouTubePlayer from 'youtube-player';

import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  player: any;
  playing: boolean;
  selectedVideo: any;
  videos: any;
  volume: number;

  @Input()
  lastVideo: any;

  videoSubscription: Subscription;
  videoListSubscription: Subscription;

  constructor(private youtube: YoutubeService, private localStorage: LocalStorageService,
    private title: Title) {
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
    this.youtube.activateVideo(this.selectedVideo);
    this.title.setTitle(this.selectedVideo.snippet.title);
    this.playing = true;
  }

  pauseVideo() {
    this.player.pauseVideo();
    this.playing = false;
  }

  getNextVideo(skipPrev = false) {
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
    this.skipVideo(false);
  }

  skipPrev() {
    this.skipVideo(true);
  }

  skipVideo(prev = false) {
    const video = this.getNextVideo(prev);
    if (video) {
      video.discogsId = this.videos.releaseInfo.id;
      video.discogsTitle = this.videos.releaseInfo.title;

      this._launchYoutubePlayer(video);
      this.youtube.activateVideo(video);
      this.localStorage.set('activeVideo', video);
    }
  }

  private _launchYoutubePlayer(video: any) {
    if (!video) {
      return;
    }

    this.title.setTitle(video.snippet.title);

    if (this.player) {
      this.player.loadVideoById(video.id);
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
      const nextVideo = this.getNextVideo();
      if (event.data === 0 && nextVideo) {
        this.player.loadVideoById(nextVideo.id);

        this.selectedVideo = nextVideo;
        this.selectedVideo.discogsId = this.videos.releaseInfo.id;
        this.selectedVideo.discogsTitle = this.videos.releaseInfo.title;

        this.localStorage.set('activeVideo', nextVideo);
      }
    });

    this.player.loadVideoById(video.id);
    this.selectedVideo = video;
    this.youtube.activateVideo(video);
    this.playing = true;
  }

  ngOnInit() {
    this.selectedVideo = this.lastVideo;
  }
}
