import { DiscogsItem } from './item';
import { DiscogsPagination } from './pagination';

export interface DiscogsCollection {
  pagination: DiscogsPagination;
  releases: DiscogsItem[];
}
