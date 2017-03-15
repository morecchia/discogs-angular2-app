import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  selectVideo(video: YoutubeVideo) {
    this.onVideoSelected.emit(video);
  }

  queueVideo(video: YoutubeVideo, id: string) {
    this.onVideoQueued.emit({video, id});
  }
}
