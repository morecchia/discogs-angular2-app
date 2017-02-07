import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Observable }   from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { DiscogsService } from '../../services';
import { DiscogsUser } from '../../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // user$: Observable<DiscogsUser>;
  user: DiscogsUser = new DiscogsUser();

  constructor(private store: Store<fromRoot.State>, private discogs: DiscogsService) {
    // this.user$ = store.select(fromRoot.getUser);
      // this.activeVideoSubscription = youtube.videoActivated$
      //   .subscribe(video => {
      //     this.activeVideo = video;
      //     browserTitle.setTitle(video && video.snippet.title);
      //   });

      // this.wantDeletedSubscription = this.discogs.wantDeleted$
      //   .subscribe(() => {
      //     this.user.num_wantlist--;
      //   });

      // this.wantAddedSubscription = this.discogs.wantAdded$
      //   .subscribe(() => {
      //     this.user.num_wantlist++;
      //   });

      // const lastVideo = this.localStorage.get('activeVideo');
      // this.activeVideo = lastVideo;

      // browserTitle.setTitle(this.activeVideo && this.activeVideo.snippet.title || this.title);

  }

  // toggleSearch() {
  //   this.searchVisible = !this.searchVisible;
  // }

  ngOnInit() {
    this.discogs.getUser()
      .subscribe(response => {
        this.user = response;
        const wantlistIds = this.discogs.wantlistItems;

        if (wantlistIds && wantlistIds.length) {
          this.discogs.wantlistItemsSource.next(wantlistIds);
          return;
        }

        this.discogs.updateWantlistIds(this.user.num_wantlist);
      });
  }
}
