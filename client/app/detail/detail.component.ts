import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DiscogsService } from '../../services/discogs.service';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [{ provide: Window, useValue: window }]
})
export class DetailComponent implements OnInit, OnDestroy {
  details: any;
  videos: any[];
  player: any;
  activeVideo: any;

  private _sub: any;

  constructor(private discogs: DiscogsService,
    private youtube: YoutubeService, private route: ActivatedRoute,
    @Inject(Window) private _window: Window) { }

  getDetailByType(type: string, id: number) {
    this.videos = [];
    switch (type) {
        case 'release':
          this.discogs.getRelease(id)
            .flatMap(release => {
              const fullDetails = release.json();
              this.details = {type: 'release', info: fullDetails};
              return fullDetails.videos.map(v => v.uri);
            })
            .subscribe(url => {
              this.youtube.oEmbed(url).subscribe(video => {
                this.videos.push({
                  url: url,
                  info: video.json()
                });
              });
            });
          break;
        case 'label':
          this.discogs.getLabel(id)
            .subscribe(label => this.details = {type: 'label', info: label.json()});
          break;
        default:
          this.discogs.getArtist(id)
            .subscribe(artist => {
              this.details = {type: 'artist', info: artist.json()};
            });
          break;
        }
  }

  playVideo(video) {
    this._onYouTubeIframeAPIReady(video, this);
  }

  private _onYouTubeIframeAPIReady(video: any, comp: any) {
    const playerId = this.youtube.getIdFromUrl(video.url);
    if (this.player) {
      this.player.destroy();
    }
    this.player =  new comp._window.YT.Player('player', {
      height: '390',
      width: '640',
      videoId: playerId,
      events: {
        'onReady': event => {
          event.target.playVideo();
          this.activeVideo = video;
        }
      }
    });
  }

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      const id = params['id'];
      const type = params['type'];

      if (id && type) {
        this.getDetailByType(type, id);
      }
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  errorHandler(err): Observable<any> {
    this.details = {type: 'error', info: {message: 'There was an error.  Try again later.'}};
    return Observable.throw(err);
  }
}
