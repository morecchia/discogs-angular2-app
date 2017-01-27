import { Component, ChangeDetectionStrategy, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';

import { LocalStorageService } from 'angular-2-local-storage';

import * as fromRoot from '../../reducers';

import { DiscogsService } from '../../services';

import { DiscogsRelease } from '../../models';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  items = [];
  listType: string;

  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;

  releases$: Observable<DiscogsRelease[]>;

  private _sub: Subscription;

  constructor(private discogs: DiscogsService, private localStorage: LocalStorageService, 
    private store: Store<fromRoot.State>, private route: ActivatedRoute) {
      this.releases$ = store.select(fromRoot.getCollection);
    }

  ngOnInit() {
    const activePage = this.localStorage.get(`${this.listType}-page`) as number;

    this._sub = this.route.params.subscribe(params => {
      this.discogs.getListByType('collection', activePage);
    });
  }
}
