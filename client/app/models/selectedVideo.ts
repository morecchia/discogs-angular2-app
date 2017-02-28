import { DiscogsRelease } from './release';
import { YoutubeVideo } from './video';

export interface SelectedVideo {
  video: YoutubeVideo;
  release: DiscogsRelease;
}
