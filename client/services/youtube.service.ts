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
  private videoSelectedSource = new Subject<any>();
  private videoListSource = new Subject<any[]>();

  videoSelected$ = this.videoSelectedSource.asObservable();
  videoList$ = this.videoListSource.asObservable();

  constructor(private http: Http) { }

  oEmbed(url: any): Observable<any> {
    return this.http.post('/api/oEmbed', {url});
  }

  getIdFromUrl(url) {
    return url.match(YT_REGEXES[0])[1] || url.match(YT_REGEXES[1])[1];
  }

  selectVideo(video: any) {
    this.videoSelectedSource.next(video);
  }

  publishVideos(videos: any[]) {
    this.videoListSource.next(videos);
  }
}
