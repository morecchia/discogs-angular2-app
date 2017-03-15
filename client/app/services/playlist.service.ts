import { Injectable } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';

import { SelectedVideo, Playlist } from '../models';

@Injectable()
export class PlaylistService {
  getPlaylistVideos(): SelectedVideo[] {
    return this.localStorage.get('playerVideos') as SelectedVideo[] || [];
  }

  setPlaylistVideos(videos: SelectedVideo[]) {
    this.localStorage.set('playerVideos', videos || []);
  }

  getPlaylists() {
    return this.localStorage.get('playlists') as Playlist[] || [];
  }

  setPlaylists(playlists: Playlist[]) {
    this.localStorage.set('playlists', playlists || []);
  }

  constructor(private localStorage: LocalStorageService) { }
}
