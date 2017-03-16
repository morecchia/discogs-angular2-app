import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { SelectedVideo, Playlist, DiscogsRelease, DiscogsImage } from '../../models';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html'
})
export class PlaylistListComponent implements OnInit {
  @Input()
  selectedPlaylist: Playlist;

  @Input()
  playlists: Playlist[];

  @Input()
  activeVideoId: string;

  @Output()
  onVideoSelected = new EventEmitter<SelectedVideo>();

  @Output()
  onVideoRemoved = new EventEmitter<SelectedVideo>();

  images: DiscogsImage[];

  playlistImagesVisible = false;

  selectVideo(video: SelectedVideo) {
    this.onVideoSelected.emit(video);
  }

  remove(video: SelectedVideo) {
    this.onVideoRemoved.emit(video);
  }

  toggleImages() {
    this.playlistImagesVisible = !this.playlistImagesVisible;
  }

  getPlaylistImages(): DiscogsImage[] {
    return this.selectedPlaylist.videos
      .map(selected => selected.release)
      .filter((release, index, releases) =>
        releases.findIndex(rel => rel.id === release.id) === index)
      .reduce((arr: DiscogsImage[], release: DiscogsRelease) =>
        arr.concat(release.images), []);
  }

  ngOnInit() {
    this.images = this.getPlaylistImages();
  }
}
