'use strict';

import { Routes } from '@angular/router';

import { ListComponent } from '../app/list/list.component';
import { DetailComponent } from '../app/detail/detail.component';

export const appRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'discogs/:type', component: ListComponent },
  { path: 'detail/:id', component: DetailComponent }
];
