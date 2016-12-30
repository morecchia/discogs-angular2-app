import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription }   from 'rxjs/Subscription';

import { LocalStorageService } from 'angular-2-local-storage';

import { YoutubeService } from '../services/youtube.service';
import { DiscogsService } from '../services/discogs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Discogs Player';
  user = {};

  activeVideo: any;
  activeVideoSubscription: Subscription;

  searchVisible: boolean;

  constructor(private router: Router, private youtube: YoutubeService, private discogs: DiscogsService,
    private localStorage: LocalStorageService, private browserTitle: Title) {
      this.activeVideoSubscription = youtube.videoActivated$
        .subscribe(video => {
          this.activeVideo = video;
          browserTitle.setTitle(video && video.snippet.title);
        });

      const lastVideo = this.localStorage.get('activeVideo');
      this.activeVideo = lastVideo;

      browserTitle.setTitle(this.activeVideo && this.activeVideo.snippet.title);
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }

  ngOnInit() {
    this.discogs.getUserData()
      .subscribe(response => {
        this.user = response.json();
      });
  }
}
