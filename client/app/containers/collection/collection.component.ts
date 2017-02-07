import { Component, ChangeDetectionStrategy, OnInit  } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { DiscogsCollection } from '../../models';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collection$: Observable<DiscogsCollection>;

  constructor(private store: Store<fromRoot.State>) {
    this.collection$ = store.select(fromRoot.getCollection);
  }

  ngOnInit() {}
}
