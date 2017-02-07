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
import { appRoutes } from './routes';
import { reducer } from './reducers';
import { ComponentsModule } from './components';
import { ReleaseEffects, CollectionEffects } from './effects';
import { DiscogsService, YoutubeService, WindowRef } from './services';
import { AppComponent, CollectionComponent, DetailComponent } from './containers';
import { PipesModule } from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MdlModule,
    PipesModule,
    LocalStorageModule.withConfig({
      prefix: 'discogs-test-app',
      storageType: 'localStorage'
    }),
    StoreModule.provideStore(reducer),
    EffectsModule.run(ReleaseEffects),
    EffectsModule.run(CollectionEffects),
    ComponentsModule
  ],
  providers: [DiscogsService, YoutubeService, WindowRef, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
