import { Injectable } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';

import { SelectedVideo } from '../models';

@Injectable()
export class PlaylistService {
  setPlaylist(videos: SelectedVideo[]) {
    this.localStorage.set('playerVideos', videos || []);
  }

  getPlaylist(): SelectedVideo[] {
    return this.localStorage.get('playerVideos') as SelectedVideo[] || [];
  }

  constructor(private localStorage: LocalStorageService) { }
}
