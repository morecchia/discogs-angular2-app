import { YoutubeVideo } from './video';

export interface YoutubeResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: YoutubeVideo[];
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
