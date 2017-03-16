export interface DiscogsRelease {
  status: string;
  videos: Video[];
  series: any[];
  labels: Label[];
  year: number;
  community: Community;
  artists: Artist[];
  images: DiscogsImage[];
  format_quantity: number;
  id: number;
  genres: string[];
  thumb: string;
  num_for_sale: number;
  title: string;
  date_changed: Date;
  master_id: number;
  lowest_price: number;
  styles: string[];
  released_formatted: string;
  formats: Format[];
  estimated_weight: number;
  master_url: string;
  released: string;
  date_added: Date;
  extraartists: Extraartist[];
  tracklist: Tracklist[];
  identifiers: Identifier[];
  companies: Company[];
  uri: string;
  country: string;
  resource_url: string;
  data_quality: string;
}

export interface Video {
  duration: number;
  embed: boolean;
  title: string;
  description: string;
  uri: string;
}

interface Label {
  name: string;
  entity_type: string;
  catno: string;
  resource_url: string;
  id: number;
  entity_type_name: string;
}

interface Rating {
  count: number;
  average: number;
}

interface Contributor {
  username: string;
  resource_url: string;
}

interface Submitter {
  username: string;
  resource_url: string;
}

interface Community {
  status: string;
  rating: Rating;
  want: number;
  contributors: Contributor[];
  have: number;
  submitter: Submitter;
  data_quality: string;
}

interface Artist {
  join: string;
  name: string;
  anv: string;
  tracks: string;
  role: string;
  resource_url: string;
  id: number;
}

export interface DiscogsImage {
  uri: string;
  height: number;
  width: number;
  resource_url: string;
  type: string;
  uri150: string;
}

interface Format {
  qty: string;
  descriptions: string[];
  name: string;
}

interface Extraartist {
  join: string;
  name: string;
  anv: string;
  tracks: string;
  role: string;
  resource_url: string;
  id: number;
}

interface Tracklist {
  duration: string;
  position: string;
  type_: string;
  extraartists: Extraartist[];
  title: string;
}

interface Identifier {
  type: string;
  value: string;
}

interface Company {
  name: string;
  entity_type: string;
  catno: string;
  resource_url: string;
  id: number;
  entity_type_name: string;
}
