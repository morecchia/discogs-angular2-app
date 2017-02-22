import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdlModule } from 'angular2-mdl';
import { Ng2PaginationModule } from 'ng2-pagination';

import { SalesPreviewComponent } from './sales-preview/sales-preview.component';
import { SalesPreviewListComponent } from './sales-preview-list/sales-preview-list.component';
import { ReleasePreviewComponent } from './release-preview/release-preview.component';
import { ReleasePreviewListComponent } from './release-preview-list/release-preview-list.component';
import { WantPreviewListComponent } from './want-preview-list/want-preview-list.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchPreviewComponent } from './search-preview/search-preview.component';
import { SearchPreviewListComponent } from './search-preview-list/search-preview-list.component';
import { ReleaseDetailComponent } from './release-detail/release-detail.component';
import { VideoListComponent } from './video-list/video-list.component';
import { SelectedVideoComponent } from './selected-video/selected-video.component';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

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
  VideoListComponent,
  SelectedVideoComponent,
  PlayerControlsComponent,
  MainLayoutComponent
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
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
