import { Component, Input } from '@angular/core';

import { YoutubeVideo } from '../../models';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  @Input()
  videos: YoutubeVideo[];
}
