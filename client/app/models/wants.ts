import { DiscogsItem } from './item';
import { DiscogsPagination } from './pagination';

export interface DiscogsWants {
  pagination: DiscogsPagination;
  wants: DiscogsItem[];
}
