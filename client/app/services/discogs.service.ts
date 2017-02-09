import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { LocalStorageService } from 'angular-2-local-storage';

import * as models from '../models';

import * as collection from '../actions/collection';
import * as fromRoot from '../reducers';

@Injectable()
export class DiscogsService {
  // get searchTerm() { return this._activeTerm; }
  // get wantlistItems() { return this.localStorage.get('wantlist_ids') as number[]; }

  // set wantlistItems(items) { this.wantlistItems = items; }
  // set releaseList(releases) { this._releaseList = releases; }

  // private _activeTerm: string;
  // private _releaseList: any[];

  // private _searchSource = new Subject<any>();
  // private _listSource = new Subject<any>();
  // private _wantDeletedSource = new Subject<any>();
  // private _wantAddedSource = new Subject<any>();

  // wantlistItemsSource = new Subject<number[]>();

  // wantDeleted$ = this._wantDeletedSource.asObservable();
  // wantAdded$ = this._wantAddedSource.asObservable();
  // wantlistItems$ = this.wantlistItemsSource.asObservable();
  // search$ = this._searchSource.asObservable();
  // list$ = this._listSource.asObservable();

  constructor(private http: Http, private localStorage: LocalStorageService) { }

  // deactivateSearch() {
  //   const page = this.localStorage.get('wantlist-page') as number;
  //   if (this._activeTerm) {
  //     this._activeTerm = null;
  //     // this.getListByType('wantlist', page)
  //     //   .subscribe(respsonse => {
  //     //     this._listSource.next(respsonse);
  //     //   });
  //   }
  // }

  // updateWantlistIds(wantlistLength: number) {
  //   this.getWantlistIds(wantlistLength)
  //     .subscribe(response => {
  //       const data = response.json();
  //       const ids = data.ids;
  //       const timestamp = data.lastUpdated;

  //       this.localStorage.set('wantlist_ids', ids);
  //       this.localStorage.set('wantlist_lastUpdated', timestamp);
  //       this.wantlistItemsSource.next(ids);
  //     });
  // }

  getWantlistIds(length: number): Observable<any> {
    return this.http.get(`/api/wantlistids?want_count=${length}`);
  }

  // searchReleases(term: string, page = 1): Observable<models.DiscogsSearch> {
  //   this._activeTerm = term;
  //   return this.http.get(`/api/search/releases/${term}/${page}`)
  //     .map(response => response.json());
  // }

  getUser(): Observable<models.DiscogsUser> {
    return this.http.get(`/api/user`)
      .map(response => response.json());
  }

  getListByType(type: string, page = 1):
    Observable<models.DiscogsCollection | models.DiscogsWants | models.DiscogsSales> {
      return this.http.get(`/api/${type}/${page}`)
        .map(response => response.json());
    }

  getRelease(id: string) {
    return this.http.get(`/api/releases/${id}`)
      .map(response => response.json());;
  }

  getArtist(id: number): Observable<any> {
    return this.http.get(`/api/artists/${id}`);
  }

  getLabel(id: number): Observable<any> {
    return this.http.get(`/api/labels/${id}`);
  }

  getListing(id: number): Observable<any> {
    return this.http.get(`/api/listing/${id}`);
  }

  // getNextRelease(currentId: number) {
  //   if (!this._releaseList) {
  //     return null;
  //   }

  //   const currentIndex = this._releaseList
  //     .map(r => r.id).indexOf(currentId);

  //   return this._releaseList.length && currentIndex > -1
  //       ? this._releaseList[currentIndex + 1]
  //       : null;
  // }

  // putWantlist(id: number): Observable<any> {
  //   return this.http.put(`api/wantlist/${id}`, {})
  //     .map(response => {
  //       this._wantAddedSource.next();
  //       return response.json();
  //     });
  // }

  // deleteWantlist(id: number): Observable<any> {
  //   return this.http.delete(`api/wantlist/${id}`)
  //     .map(() => this._wantDeletedSource.next());
  // }
}
