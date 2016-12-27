import { Component, OnInit, Input } from '@angular/core';
import { Router  } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription }   from 'rxjs/Subscription';

import { LocalStorageService } from 'angular-2-local-storage';

import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Discogs Player';
  activeVideo: any;
  activeVideoSubscription: Subscription;

  constructor(private router: Router, private youtube: YoutubeService,
    private localStorage: LocalStorageService, private browserTitle: Title) {
      this.activeVideoSubscription = youtube.videoActivated$
        .subscribe(video => {
          this.activeVideo = video;
          browserTitle.setTitle(this.activeVideo.snippet.title);
        });

      const lastVideo = this.localStorage.get('activeVideo');
      this.activeVideo = lastVideo;

      browserTitle.setTitle(this.activeVideo.snippet.title);
  }

  ngOnInit() {
  }
}
