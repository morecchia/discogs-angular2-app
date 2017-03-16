import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UUID } from 'angular2-uuid';

import { YoutubeVideo, Playlist, PlaylistAdd } from '../../models';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  @Input()
  videos: YoutubeVideo[];

  @Input()
  playlists: Playlist[];

  @Input()
  activeVideoId: string;

  @Output()
  onVideoSelected = new EventEmitter<YoutubeVideo>();

  @Output()
  onVideoQueued = new EventEmitter<PlaylistAdd>();

  @Output()
  onPlaylistAdd = new EventEmitter<Playlist>();

  addType = 'video';

  selectVideo(video: YoutubeVideo) {
    this.onVideoSelected.emit(video);
  }

  queueVideo(playlistAdd: PlaylistAdd) {
    this.onVideoQueued.emit(playlistAdd);
  }

  addPlaylist(playlist: Playlist) {
    this.onPlaylistAdd.emit(playlist);
  }
}
