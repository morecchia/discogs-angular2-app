'use strict';

import { Routes } from '@angular/router';

import * as containers from './containers';

export const AppRoutes: Routes = [
  { path: '', component: containers.WantlistComponent },
  { path: 'discogs/collection', component: containers.CollectionComponent },
  { path: 'discogs/wantlist', component: containers.WantlistComponent },
  { path: 'discogs/sales', component: containers.SalesComponent },
  { path: 'detail/:id', component: containers.ViewDetailComponent },
  { path: 'search/:q', component: containers.SearchComponent }
];
