import { Component, OnInit, Input } from '@angular/core';
import { Router  } from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';

import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Discogs Test App!';
  activeVideo: any;

  constructor(private router: Router, private youtube: YoutubeService,
    private localStorage: LocalStorageService ) {
      const lastVideo = this.localStorage.get('activeVideo');
      this.activeVideo = lastVideo;
  }

  ngOnInit() {
  }
}
