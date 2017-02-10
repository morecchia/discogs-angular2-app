import { Component, Input } from '@angular/core';

import { YoutubeVideo } from '../../models';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.css']
})
export class PlayerControlsComponent {
  @Input()
  video: YoutubeVideo;
}
