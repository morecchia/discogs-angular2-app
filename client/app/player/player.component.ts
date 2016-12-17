import { Component, OnInit, Inject } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [{ provide: Window, useValue: window }]
})
export class PlayerComponent implements OnInit {
  player: any;
  playing: boolean;
  volume: number = 50;
  selectedVideo: any;
  videos: any[];

  videoSubscription: Subscription;
  videoListSubscription: Subscription;

  constructor(@Inject(Window) private _window: Window, private youtube: YoutubeService) {
    this.videoSubscription = youtube.videoSelected$
      .subscribe(video => {
        console.log(video);
        this.selectedVideo = video;
        this._launchYoutubePlayer(video, this);
      });

    this.videoListSubscription = youtube.videoList$
      .subscribe(videos => {
        this.videos = videos;
      });
  }

  resumeVideo(video) {
    this.player.playVideo();
    this.playing = true;
  }

  pauseVideo() {
    this.player.pauseVideo();
    this.playing = false;
  }

  getNextVideo() {
    if (!this.selectedVideo) {
      return null;
    }
    const currentIndex = this.videos.map(v => v.id).indexOf(this.selectedVideo.id);
    return this.videos.length && (this.videos.length > 1 || currentIndex !== this.videos.length)
      ? this.videos[currentIndex + 1]
      : null;
  }

  getPrevVideo() {
    if (!this.selectedVideo) {
      return null;
    }
    const currentIndex = this.videos.map(v => v.id).indexOf(this.selectedVideo.id);
    return this.videos.length && (this.videos.length > 1 || currentIndex !== 0)
      ? this.videos[currentIndex - 1]
      : null;
  }

  changeVolume(value) {
    this.player.setVolume(value);
  }

  seekFw() {
    const current = this.player.getCurrentTime();
    this.player.seekTo(current + 5);
  }

  seekRw() {
    const current = this.player.getCurrentTime();
    this.player.seekTo(current + 5);
  }

  skipNext() {
    const video = this.getNextVideo();
    if (video) {
      this._launchYoutubePlayer(video, this);
    }
  }

  skipPrev() {
    const video = this.getPrevVideo();
    if (video) {
      this._launchYoutubePlayer(video, this);
    }
  }

  private _launchYoutubePlayer(video: any, comp: any) {
    if (this.player) {
      this.player.loadVideoById(video.id);
      this.selectedVideo = video;
      this.playing = true;
      return;
    }
    this.player =  new comp._window.YT.Player('player', {
      height: '1',
      width: '1',
      videoId: video.id,
      events: {
        'onReady': event => {
          event.target.playVideo();
          event.target.setVolume(this.volume);
          this.selectedVideo = video;
          this.playing = true;
        },
        'onStateChange': event => {
          const nextVideo = this.getNextVideo();
          if (event.data === 0 && nextVideo) {
            this.player.loadVideoById(nextVideo.id);
            this.selectedVideo = nextVideo;
          }
        }
      }
    });
  }

  ngOnInit() {
  }
}
