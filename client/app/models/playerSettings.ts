import { DiscogsRelease } from './release';
import { YoutubeVideo } from './video';

export interface PlayerSettings {
  volume: number;
  activeVideo: YoutubeVideo;
  activeRelease: DiscogsRelease;
  playerVideos: YoutubeVideo[];
}
