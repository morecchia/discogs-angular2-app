import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as playlistMenu from '../../actions/playlist';

import { SelectedVideo, Playlist, PlaylistAdd, DiscogsRelease, DiscogsImage } from '../../models';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html'
})
export class PlaylistListComponent implements OnChanges {
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

  addType = 'video';

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

  addPlaylist(playlist: Playlist) {
    this.store.dispatch(new playlistMenu.AddAction(playlist));
  }

  queueVideo(playlistAdd: PlaylistAdd, release: DiscogsRelease) {
    const videos = [{video: playlistAdd.videos[0], release, playlistIds: []}];
    this.store.dispatch(new playlistMenu.AddVideosAction({videos, id: playlistAdd.id}));
  }

  ngOnChanges() {
    this.images = this.getPlaylistImages();
  }

  constructor(private store: Store<fromRoot.State>) { }
}
