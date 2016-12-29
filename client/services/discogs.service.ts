import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class DiscogsService {
  get searchTerm(): string { return this._activeTerm; }
  set activeSearch(term: string) { this._activeTerm = term; }

  private _activeTerm: string;
  private _searchSource = new Subject<any>();

  search$ = this._searchSource.asObservable();

  constructor(private http: Http) { }

  searchReleases(term: string, page = 1) {
    Observable.of(term)
      .filter(t => t.length > 2)
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(q => this.http.get(`/api/search/releases/${q}/${page}`))
      .subscribe(response => {
        this._searchSource.next(response);
      });
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
}
