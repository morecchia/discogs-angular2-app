'use strict';

import { Routes } from '@angular/router';

import { CollectionComponent } from './containers';
import { DetailComponent } from './components/detail/detail.component';

export const appRoutes: Routes = [
  { path: '', component: CollectionComponent },
  { path: 'discogs/collection', component: CollectionComponent },
  { path: 'detail/:id', component: DetailComponent }
];
