import { Component, Input, Output, EventEmitter } from '@angular/core';

import { YoutubeVideo, SelectedVideo } from '../../models';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  @Input()
  videos: YoutubeVideo[];

  @Input()
  activeVideoId: string;

  @Output()
  onVideoSelected = new EventEmitter<YoutubeVideo>();

  @Output()
  onVideoQueued = new EventEmitter<YoutubeVideo>();

  selectVideo(video: YoutubeVideo) {
    this.onVideoSelected.emit(video);
  }

  queueVideo(video: YoutubeVideo) {
    this.onVideoQueued.emit(video);
  }
}
