export interface Patch {
  small: JSON;
  large: JSON;
}

export interface Links {
  patch: JSON;
}

export interface Reddit {
  campaign: JSON;
  launch: JSON;
  media: JSON;
  recovery: JSON | null;
}

export interface Flickr {
  small: JSON[];
  original: JSON[];
  presskit: JSON;
  webcast: JSON;
  youtube_id: JSON;
  article: JSON;
  wikipedia: JSON;
}

export interface Core {
  core: JSON;
  legs: JSON;
  flight: JSON;
  reused: JSON;
  landpad: JSON | null;
  gridfins: JSON;
  landing_type: JSON | null;
  landing_attempt: JSON;
  landing_success: JSON | null;
}
