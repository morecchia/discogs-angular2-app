import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { LocalStorageService } from 'angular-2-local-storage';

import { getCachedItems } from '../util';
import * as models from '../models';

@Injectable()
export class DiscogsService {
  loggedInUser: string;

  constructor(private http: Http, private localStorage: LocalStorageService) {
    this.loggedInUser = localStorage.get('discogs-user') as string;
  }

  storeUsername(login: models.UserLogin) {
    if (login.rememberMe) {
      this.localStorage.set('discogs-user', login.username);
    }

    this.loggedInUser = login.username;
  }

  clearUsername() {
    this.localStorage.remove('discogs-user');
  }

  updateWantlistIds(response: any) {
    this.localStorage.set('wantlist_ids', response.ids);
    this.localStorage.set('wantlist_lastUpdated', response.lastUpdated);
  }

  getWantlistIds(count: number, lastAdded: Date): Observable<any> {
    const lastUpdated = this.localStorage.get('wantlist_lastUpdated') as Date;
    const ids = this.localStorage.get('wantlist_ids') as number[];
    if (lastUpdated && lastUpdated >= lastAdded) {
      return of({ids, lastUpdated});
    }
    return this.http.get(`/api/wantlistids/${this.loggedInUser}?want_count=${count}`)
      .map(response => response.json());
  }

  searchReleases(term: string, page = 1): Observable<models.DiscogsSearch> {
    return this.http.get(`/api/search/releases/${term}/${page}`)
      .map(response => response.json());
  }

  getUser(username: string): Observable<models.DiscogsUser> {
    return this.http.get(`/api/user/${username}`)
      .map(response => response.json());
  }

  getListByType(type: string, page = 1, cachedList: any) {
      if (!this.loggedInUser) {
        return of({});
      }

      const cachedItems = getCachedItems(cachedList);

      return cachedItems.length && page === 1
        ? of({list: cachedList, cached: true})
        : this.http.get(`/api/${type}/${this.loggedInUser}/${page}`)
          .map(response => {
            return {list: response.json(), cached: false};
          });
    }

  getRelease(id: string):  Observable<models.DiscogsRelease> {
    return this.http.get(`/api/releases/${id}`)
      .map(response => response.json());
  }

  getArtist(id: number): Observable<any> {
    return this.http.get(`/api/artists/${id}`)
      .map(response => response.json());
  }

  getLabel(id: number): Observable<any> {
    return this.http.get(`/api/labels/${id}`)
      .map(response => response.json());
  }

  getListing(id: number): Observable<models.DiscogsListing> {
    return this.http.get(`/api/listing/${id}`)
      .map(response => response.json());
  }

  getNextRelease(releases: models.DiscogsRelease[], currentId: number) {
    const currentIndex = releases
      .map(r => r.id).indexOf(currentId);

    return releases.length && currentIndex > -1
        ? releases[currentIndex + 1]
        : null;
  }

  putWantlist(id: number): Observable<any> {
    return this.http.put(`api/wantlist/${id}`, {})
      .map(response => response.json());
  }

  deleteWantlist(id: number): Observable<any> {
    return this.http.delete(`api/wantlist/${id}`);
  }
}
