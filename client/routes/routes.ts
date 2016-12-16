import { Routes } from '@angular/router';

import { WantlistComponent } from '../app/wantlist/wantlist.component';
import { DetailComponent } from '../app/detail/detail.component';
import { CollectionComponent } from '../app/collection/collection.component';
import { SalesComponent } from '../app/sales/sales.component';

export const appRoutes: Routes = [
  { path: 'wants', component: WantlistComponent,
    children: [
      { path: 'detail/:type/:id', component: DetailComponent}
    ]
  },
  { path: 'collection', component: CollectionComponent,
    children: [
      { path: 'detail/:type/:id', component: DetailComponent}
    ]
  },
  { path: 'sales', component: SalesComponent,
    children: [
      { path: 'detail/:type/:id', component: DetailComponent}
    ]
  }
];