import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import * as fromSales from '../reducers';
import * as sales from '../actions/sales';
import { DiscogsService } from '../services';
import { DiscogsSales } from '../models';

@Injectable()
export class SalesEffects {
  @Effect()
  loadSales$: Observable<Action> = this.actions$
    .ofType(sales.ActionTypes.LOAD)
    .withLatestFrom(this.store, (action, state) => {
      return {
        action,
        sales: {
          sales: state.sales.listings,
          pagination: state.collection.pagination
        }
      };
    })
    .switchMap(state => {
      return this.discogs.getListByType('inventory', state.action.payload, state.sales)
        .map((result: {list: DiscogsSales, cached: boolean}) => new sales.LoadSuccessAction(result))
        .catch(error => of(new sales.LoadFailAction(error)));
      });

  constructor(private actions$: Actions, private store: Store<fromSales.State>, private discogs: DiscogsService) { }
}
