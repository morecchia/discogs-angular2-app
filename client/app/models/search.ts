import { DiscogsPagination } from './pagination';

export interface DiscogsSearch {
  pagination: DiscogsPagination;
  results: DiscogsSearchResult[];
}

interface Community {
  want: number;
  have: number;
}

export interface DiscogsSearchResult {
  style: string[];
  thumb: string;
  title: string;
  country: string;
  format: string[];
  uri: string;
  community: Community;
  label: string[];
  catno: string;
  year: string;
  genre: string[];
  resource_url: string;
  type: string;
  id: number;
}
