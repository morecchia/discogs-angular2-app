import { Component, Input, Output, EventEmitter } from '@angular/core';

import { YoutubeVideo } from '../../models';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  @Input()
  videos: YoutubeVideo[];

  @Input()
  loading: boolean;

  @Output()
  onVideoSelected = new EventEmitter<YoutubeVideo>();

  selectVideo(video: YoutubeVideo) {
    this.onVideoSelected.emit(video);
  }
}
