import { DiscogsListing } from './listing';
import { DiscogsPagination } from './pagination';

export interface DiscogsSales {
  pagination: DiscogsPagination;
  listings: DiscogsListing[];
}
