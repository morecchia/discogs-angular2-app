// core
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// external
import { LocalStorageModule } from 'angular-2-local-storage';
import { MdlModule } from 'angular2-mdl';

// app
import { AppRoutes } from './routes';
import { reducer } from './reducers';
import { ComponentsModule } from './components';
import * as effects from './effects';
import { DiscogsService, YoutubeService, WindowRef } from './services';
import * as containers from './containers';
import { PipesModule } from './pipes';

@NgModule({
  declarations: [
    containers.AppComponent,
    containers.WantlistComponent,
    containers.CollectionComponent,
    containers.SalesComponent,
    containers.SelectedDetailComponent,
    containers.ViewDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    MdlModule,
    PipesModule,
    LocalStorageModule.withConfig({
      prefix: 'discogs-test-app',
      storageType: 'localStorage'
    }),
    StoreModule.provideStore(reducer),
    EffectsModule.run(effects.ReleaseEffects),
    EffectsModule.run(effects.CollectionEffects),
    EffectsModule.run(effects.WantlistEffects),
    EffectsModule.run(effects.UserEffects),
    ComponentsModule
  ],
  providers: [DiscogsService, YoutubeService, WindowRef, Title],
  bootstrap: [containers.AppComponent]
})
export class AppModule { }
