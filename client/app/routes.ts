import { Routes } from '@angular/router';

import * as containers from './containers';

export const routes: Routes = [
  { path: '', component: containers.LoginComponent },
  { path: 'collection', component: containers.CollectionComponent },
  { path: 'wantlist', component: containers.WantlistComponent },
  { path: 'sales', component: containers.SalesComponent },
  { path: 'playlist/:id', component: containers.ViewPlaylistComponent },
  { path: 'detail/:id', component: containers.ViewDetailComponent },
  { path: 'search/:q', component: containers.SearchComponent },
  { path: 'login', component: containers.LoginComponent }
];

export const navigableContainers = [
  containers.AppComponent,
  containers.WantlistComponent,
  containers.CollectionComponent,
  containers.WantlistComponent,
  containers.SalesComponent,
  containers.ViewPlaylistComponent,
  containers.ViewDetailComponent,
  containers.SearchComponent,
  containers.LoginComponent,
  containers.PlayerComponent,
  containers.SelectedPlaylistComponent,
  containers.SelectedDetailComponent
];
