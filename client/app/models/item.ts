import { DiscogsRelease } from './release';

export class DiscogsItem {
    id: number;
    rating: number;
    basic_information: DiscogsRelease;
    resource_url: string;
    date_added: Date;
    instance_id: number;
}
