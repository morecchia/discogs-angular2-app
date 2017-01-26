import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { Ng2PaginationModule } from 'ng2-pagination';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MdlModule } from 'angular2-mdl';

import { appRoutes } from './routes';

import { DiscogsService, YoutubeService, WindowRef } from './services';

import { ActiveMembersPipe, JoinNamesPipe, EmbedPipe, FormatDurationPipe } from './pipes';

import { AppComponent, ListComponent } from './containers';

import { DetailComponent, PlayerComponent, SearchBoxComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
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
    })
  ],
  providers: [DiscogsService, YoutubeService, WindowRef, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
