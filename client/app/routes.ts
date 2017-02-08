'use strict';

import { Routes } from '@angular/router';

import { CollectionComponent, ViewDetailComponent } from './containers';

export const appRoutes: Routes = [
  { path: '', component: CollectionComponent },
  { path: 'discogs/collection', component: CollectionComponent },
  // { path: 'discogs/wantlist', component: WantlistComponent },
  // { path: 'discogs/sales', component: SalesComponent },
  { path: 'detail/:id', component: ViewDetailComponent }
];
