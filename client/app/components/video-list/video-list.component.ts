import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UUID } from 'angular2-uuid';

import { YoutubeVideo, Playlist } from '../../models';

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
  onVideoQueued = new EventEmitter<{video: YoutubeVideo, id: string}>();

  @Output()
  onPlaylistAdd = new EventEmitter<Playlist>();

  selectVideo(video: YoutubeVideo) {
    this.onVideoSelected.emit(video);
  }

  queueVideo(video: YoutubeVideo, id: string) {
    this.onVideoQueued.emit({video, id});
  }

  addPlaylist(dialog: any, playlistName: string, video: YoutubeVideo) {
      if (playlistName) {
        dialog.close();

        const id = UUID.UUID();

        this.onPlaylistAdd.emit({
          name: playlistName,
          count: 1,
          id: id,
          videos: []
        });

        this.queueVideo(video, id);
      }
    }
}
