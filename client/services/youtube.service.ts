import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const YT_REGEXES = [
  /https?:\/\/(?:www\.)?youtube\.com\/.*?v=(.*)$/,
  /https?:\/\/youtu\.be\/(.*)/
];

@Injectable()
export class YoutubeService {
  private _videoSelectedSource = new Subject<any>();
  private _videoListSource = new Subject<any[]>();
  private _videoActivatedSource = new Subject<any>();

  videoSelected$ = this._videoSelectedSource.asObservable();
  videoActivated$ = this._videoActivatedSource.asObservable();
  videoList$ = this._videoListSource.asObservable();

  constructor(private http: Http) { }

  oEmbed(url: any): Observable<any> {
    return this.http.post('/api/oEmbed', {url});
  }

  getIdFromUrl(url) {
    return url.match(YT_REGEXES[0])[1] || url.match(YT_REGEXES[1])[1];
  }

  selectVideo(video: any) {
    this._videoSelectedSource.next(video);
  }

  publishVideos(videos: any[]) {
    this._videoListSource.next(videos);
  }

  activateVideo(video: any) {
    this._videoActivatedSource.next(video);
  }
}
