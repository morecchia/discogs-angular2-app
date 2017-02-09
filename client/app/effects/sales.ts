import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';

import * as sales from '../actions/sales';
import { DiscogsService } from '../services';
import { DiscogsSales } from '../models';

@Injectable()
export class SalesEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadSales$: Observable<Action> = this.actions$
    .ofType(sales.ActionTypes.LOAD)
    .startWith(new sales.LoadAction())
    .mergeMap(action => {
      return this.discogs.getListByType('inventory', action.payload)
        .map((inventory: DiscogsSales) => new sales.LoadSuccessAction(inventory))
        .catch(error => of(new sales.LoadFailAction(error)));
      });

  constructor(private actions$: Actions, private discogs: DiscogsService) { }
}
