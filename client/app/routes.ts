import { Routes } from '@angular/router';

import * as containers from './containers';

export const routes: Routes = [
  { path: '', component: containers.WantlistComponent },
  { path: 'collection', component: containers.CollectionComponent },
  { path: 'wantlist', component: containers.WantlistComponent },
  { path: 'sales', component: containers.SalesComponent },
  { path: 'detail/:id', component: containers.ViewDetailComponent },
  { path: 'search/:q', component: containers.SearchComponent }
];
