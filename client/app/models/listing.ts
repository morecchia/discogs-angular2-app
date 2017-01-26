export class DiscogsListing {
  status: string;
  price: Price;
  allow_offers: boolean;
  sleeve_condition: string;
  id: number;
  condition: string;
  posted: Date;
  ships_from: string;
  uri: string;
  comments: string;
  seller: Seller;
  release: Release;
  resource_url: string;
  audio: boolean;
}

interface Price {
  currency: string;
  value: number;
}

interface Seller {
  username: string;
  resource_url: string;
  id: number;
}

interface Release {
  catalog_number: string;
  resource_url: string;
  year: number;
  id: number;
  description: string;
}

