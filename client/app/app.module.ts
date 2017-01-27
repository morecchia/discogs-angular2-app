// core
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// external
import { Ng2PaginationModule } from 'ng2-pagination';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MdlModule } from 'angular2-mdl';

// app
import { appRoutes } from './routes';
import { reducer } from './reducers';
import { ReleaseEffects, CollectionEffects } from './effects';
import { DiscogsService, YoutubeService, WindowRef } from './services';
import { ActiveMembersPipe, JoinNamesPipe, EmbedPipe, FormatDurationPipe } from './pipes';
import { AppComponent, CollectionComponent } from './containers';
import { DetailComponent, PlayerComponent, SearchBoxComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    DetailComponent,
    PlayerComponent,
    SearchBoxComponent,
    ActiveMembersPipe,
    JoinNamesPipe,
    EmbedPipe,
    FormatDurationPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Ng2PaginationModule,
    MdlModule,
    LocalStorageModule.withConfig({
      prefix: 'discogs-test-app',
      storageType: 'localStorage'
    }),
    StoreModule.provideStore(reducer),
    EffectsModule.run(ReleaseEffects),
    EffectsModule.run(CollectionEffects),
  ],
  providers: [DiscogsService, YoutubeService, WindowRef, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
