import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { DiscogsService } from '../services/discogs.service';
import { YoutubeService } from '../services/youtube.service';

import { ActiveMembersPipe } from '../pipes/active-members.pipe';
import { JoinNamesPipe } from '../pipes/join-names.pipe';

import { AppComponent } from './app.component';
import { WantlistComponent } from './wantlist/wantlist.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { DetailComponent } from './detail/detail.component';
import { CollectionComponent } from './collection/collection.component';
import { SalesComponent } from './sales/sales.component';
import { EmbedPipe } from '../pipes/embed.pipe';

const appRoutes: Routes = [
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

@NgModule({
  declarations: [
    AppComponent,
    WantlistComponent,
    SearchBoxComponent,
    MainMenuComponent,
    DetailComponent,
    ActiveMembersPipe,
    JoinNamesPipe,
    CollectionComponent,
    SalesComponent,
    EmbedPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DiscogsService, YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
