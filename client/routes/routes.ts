import { Routes } from '@angular/router';

import { WantlistComponent } from '../app/wantlist/wantlist.component';
import { DetailComponent } from '../app/detail/detail.component';
import { CollectionComponent } from '../app/collection/collection.component';
import { SalesComponent } from '../app/sales/sales.component';

export const appRoutes: Routes = [
  { path: 'wants', component: WantlistComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'detail/:id', component: DetailComponent }
];
