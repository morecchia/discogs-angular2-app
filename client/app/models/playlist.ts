import { SelectedVideo } from './selectedVideo';

export interface Playlist {
  id: string;
  name: string;
  count: number;
  videos: SelectedVideo[];
}
