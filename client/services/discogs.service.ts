import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class DiscogsService {
  get searchTerm() { return this._activeTerm; }

  set releaseList(releases) { this._releaseList = releases; }

  private _activeTerm: string;
  private _releaseList: any[];

  private _searchSource = new Subject<any>();
  private _listSource = new Subject<any>();

  search$ = this._searchSource.asObservable();
  list$ = this._listSource.asObservable();

  constructor(private http: Http, private localStorage: LocalStorageService) { }

  deactivateSearch() {
    const page = this.localStorage.get('wantlist-page') as number;
    if (this._activeTerm) {
      this._activeTerm = null;
      this.getListByType('wantlist', page)
        .subscribe(respsonse => {
          this._listSource.next(respsonse);
        });
    }
  }

  searchReleases(term: string, page = 1) {
    this._activeTerm = term;

    Observable.of(term)
      .filter(t => t.length > 2)
      .map(t => encodeURIComponent(t.trim()))
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(q => this.http.get(`/api/search/releases/${q}/${page}`))
      .subscribe(response => {
        this._searchSource.next(response);
      });
  }

  getUserData() {
    return this.http.get(`/api/user`);
  }

  getListByType(type: string, page = 1): Observable<any> {
    return this.http.get(`/api/${type}/${page}`);
  }

  getRelease(id: number): Observable<any> {
    return this.http.get(`/api/releases/${id}`);
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

  getNextRelease(currentId: number) {
    if (!this._releaseList) {
      return null;
    }

    const currentIndex = this._releaseList.map(r => r.id).indexOf(currentId);

    return this._releaseList.length && currentIndex > -1
        ? this._releaseList[currentIndex + 1]
        : null;
  }
}
