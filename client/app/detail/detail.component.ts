import { Component, OnInit, OnDestroy, Output, Inject, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DiscogsService } from '../../services/discogs.service';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  details: any;
  videos: any[];

  private _sub: any;

  constructor(private discogs: DiscogsService,
    private youtube: YoutubeService, private route: ActivatedRoute) { }

  getDetailByType(type: string, id: number) {
    this.videos = [];
    switch (type) {
        case 'release':
          this.discogs.getRelease(id)
            .catch(err => this.errorHandler(err))
            .flatMap(release => {
              const fullDetails = release.json();
              this.details = {type: 'release', info: fullDetails};
              return fullDetails.videos
                ? fullDetails.videos.map(v => v.uri) : [];
            })
            .subscribe(url => {
              this.youtube.oEmbed(url)
                .subscribe(video => {
                  this.videos.push({
                    id: this.youtube.getIdFromUrl(url),
                    info: video.json()
                  });
                  this.youtube.publishVideos(this.videos);
              });
            });
          break;
        case 'label':
          this.discogs.getLabel(id)
            .catch(err => this.errorHandler(err))
            .subscribe(label => this.details = {type: 'label', info: label.json()});
          break;
        default:
          this.discogs.getArtist(id)
            .catch(err => this.errorHandler(err))
            .subscribe(artist => {
              this.details = {type: 'artist', info: artist.json()};
            });
          break;
        }
  }

  selectVideo(video) {
    this.youtube.selectVideo(video);
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
