// core
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

// external
import { LocalStorageModule } from 'angular-2-local-storage';
import { MdlModule } from 'angular2-mdl';

// app
import { routes } from './routes';
import { reducer } from './reducers';
import * as effects from './effects';
import * as containers from './containers';
import { ComponentsModule } from './components';
import { PipesModule } from './pipes';
import * as services from './services';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

@NgModule({
  declarations: [
    containers.AppComponent,
    containers.WantlistComponent,
    containers.CollectionComponent,
    containers.SalesComponent,
    containers.SelectedDetailComponent,
    containers.ViewDetailComponent,
    containers.SelectedPlaylistComponent,
    containers.ViewPlaylistComponent,
    containers.PlayerComponent,
    containers.SearchComponent,
    InfiniteScrollDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MdlModule,
    PipesModule,
    LocalStorageModule.withConfig({
      prefix: 'discogs-test-app',
      storageType: 'localStorage'
    }),
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(reducer),
    EffectsModule.run(effects.ReleaseEffects),
    EffectsModule.run(effects.CollectionEffects),
    EffectsModule.run(effects.WantlistEffects),
    EffectsModule.run(effects.SalesEffects),
    EffectsModule.run(effects.SearchEffects),
    EffectsModule.run(effects.UserEffects),
    EffectsModule.run(effects.PlayerEffects),
    EffectsModule.run(effects.PlaylistEffects),
    EffectsModule.run(effects.VideoEffects),
    ComponentsModule
  ],
  providers: [
    services.DiscogsService,
    services.YoutubeService,
    services.PlaylistService,
    services.UuidService,
    services.WindowRef,
    Title
  ],
  bootstrap: [containers.AppComponent]
})
export class AppModule { }
