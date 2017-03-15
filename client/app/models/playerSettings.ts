import { DiscogsRelease } from './release';
import { SelectedVideo } from './selectedVideo';

export interface PlayerSettings {
  volume: number;
  activeVideo: SelectedVideo;
}
