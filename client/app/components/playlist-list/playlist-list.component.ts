import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SelectedVideo, Playlist } from '../../models';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent {
  @Input()
  selectedPlaylist: Playlist;

  @Input()
  playlists: Playlist[];

  @Input()
  activeVideoId: string;

  @Output()
  onVideoSelected = new EventEmitter<SelectedVideo>();

  selectVideo(video: SelectedVideo) {
    this.onVideoSelected.emit(video);
  }
}
