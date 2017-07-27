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
import { MdlModule } from '@angular-mdl/core';
import { UuidService } from 'angular2-uuid';

// app
import { routes, navigableContainers } from './routes';
import { AuthGuard } from './guards/auth.guard';
import { reducer } from './reducers';
import * as effects from './effects';
import { AppComponent } from './containers';
import { ComponentsModule } from './components';
import { PipesModule } from './pipes';
import * as services from './services';

@NgModule({
  declarations: [...navigableContainers],
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
    services.WindowRef,
    AuthGuard,
    UuidService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
