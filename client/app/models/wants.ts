import { DiscogsItem } from './item';
import { DiscogsPagination } from './pagination';

export class DiscogsWants {
  pagination: DiscogsPagination;
  wants: DiscogsItem[];

  constructor(response: any) {
    this.pagination = response.pagination;
    this.wants = response.wants;
  }
}
