import { Component, OnInit, Inject, Input } from '@angular/core';

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
  videos: any[];
  volume: number;

  @Input()
  lastVideo: any;

  videoSubscription: Subscription;
  videoListSubscription: Subscription;

  constructor(private youtube: YoutubeService, private localStorage: LocalStorageService) {
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

  resumeVideo(video) {
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

  getNextVideo(skipPrev = false) {
    if (!this.selectedVideo) {
      return null;
    }

    const currentIndex = this.videos.map(v => v.id).indexOf(this.selectedVideo.id);

    if (skipPrev) {
      return this.videos.length && (this.videos.length > 1 || currentIndex !== 0)
        ? this.videos[currentIndex - 1]
        : null;
    }

    return this.videos.length && (this.videos.length > 1 || currentIndex !== this.videos.length)
      ? this.videos[currentIndex + 1]
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
    const video = this.getNextVideo();
    if (video) {
      this._launchYoutubePlayer(video);
      this.youtube.activateVideo(video);
      this.localStorage.set('activeVideo', video);
    }
  }

  skipPrev() {
    const video = this.getNextVideo(true);
    if (video) {
      this._launchYoutubePlayer(video);
      this.youtube.activateVideo(video);
      this.localStorage.set('activeVideo', video);
    }
  }

  private _launchYoutubePlayer(video: any) {
    if (!video) {
      return;
    }

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
        this.localStorage.set('activeVideo', nextVideo);
      }
    });

    this.player.loadVideoById(video.id);
    this.selectedVideo = video;
    this.playing = true;
  }

  ngOnInit() {
    this.selectedVideo = this.lastVideo;
  }
}
