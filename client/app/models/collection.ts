import { DiscogsItem } from './item';
import { DiscogsPagination } from './pagination';

export class DiscogsCollection {
  pagination: DiscogsPagination;
  releases: DiscogsItem[];
}
