import { Component, Input } from '@angular/core';

import { DiscogsRelease, YoutubeVideo } from '../../models';

@Component({
  selector: 'app-selected-video',
  templateUrl: './selected-video.component.html',
  styleUrls: ['./selected-video.component.css']
})
export class SelectedVideoComponent {
  @Input()
  selectedVideo: YoutubeVideo;

  @Input()
  currentRelease: DiscogsRelease;

  playing: boolean;
  volumeVisible: boolean;
  playerFrameVisible: boolean;

  currentTime: string;
}
