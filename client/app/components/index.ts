import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdlModule } from 'angular2-mdl';
import { Ng2PaginationModule } from 'ng2-pagination';

import { SnackbarService } from '../services';

import { SalesPreviewComponent } from './sales-preview/sales-preview.component';
import { SalesPreviewListComponent } from './sales-preview-list/sales-preview-list.component';
import { ReleasePreviewComponent } from './release-preview/release-preview.component';
import { ReleasePreviewListComponent } from './release-preview-list/release-preview-list.component';
import { WantPreviewListComponent } from './want-preview-list/want-preview-list.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchPreviewComponent } from './search-preview/search-preview.component';
import { SearchPreviewListComponent } from './search-preview-list/search-preview-list.component';
import { ReleaseDetailComponent } from './release-detail/release-detail.component';
import { ReleaseImagesComponent } from './release-images/release-images.component';
import { VideoListComponent } from './video-list/video-list.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { SelectedVideoComponent } from './selected-video/selected-video.component';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { AddPlaylistMenuComponent } from './add-playlist-menu/add-playlist-menu.component';
import { PlaylistMenuComponent } from './playlist-menu/playlist-menu.component';
import { PlayerTimeComponent } from './player-time/player-time.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { HeaderRowComponent } from './header-row/header-row.component';
import { DiscogsLoginComponent } from './discogs-login/discogs-login.component';

import { PipesModule } from '../pipes';

export const COMPONENTS = [
  ReleasePreviewComponent,
  ReleasePreviewListComponent,
  WantPreviewListComponent,
  SearchBoxComponent,
  SearchPreviewComponent,
  SearchPreviewListComponent,
  SalesPreviewComponent,
  SalesPreviewListComponent,
  ReleaseDetailComponent,
  ReleaseImagesComponent,
  VideoListComponent,
  PlaylistListComponent,
  SelectedVideoComponent,
  PlayerControlsComponent,
  PlaylistMenuComponent,
  AddPlaylistMenuComponent,
  PlayerTimeComponent,
  MainLayoutComponent,
  MainNavigationComponent,
  HeaderRowComponent,
  DiscogsLoginComponent
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule,
    MdlModule,
    Ng2PaginationModule
  ],
  providers: [SnackbarService],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
