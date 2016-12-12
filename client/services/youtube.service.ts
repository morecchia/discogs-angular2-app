import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const YT_REGEXES = [
  /https?:\/\/(?:www\.)?youtube\.com\/.*?v=(.*)$/,
  /https?:\/\/youtu\.be\/(.*)/
];

@Injectable()
export class YoutubeService {
  constructor(private http: Http) { }

  oEmbed(url: any): Observable<any> {
    return this.http.post('/api/oEmbed', {url});
  }

  getIdFromUrl(url) {
    return url.match(YT_REGEXES[0])[1];
  }
}
