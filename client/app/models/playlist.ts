import { SelectedVideo } from './selectedVideo';
import { YoutubeVideo } from './video';

export interface Playlist {
  id: string;
  name: string;
  count: number;
  videos: SelectedVideo[];
}

export interface PlaylistAdd {
  videos: YoutubeVideo[];
  id: string;
}
