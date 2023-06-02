export interface Patch {
    small: string;
    large: string;
  }
  
  export interface Links {
    patch: Patch;
  }
  
  export interface Reddit {
    campaign: string;
    launch: string;
    media: string;
    recovery: null;
  }
  
  export interface Flickr {
    small: string[];
    original: string[];
    presskit: string;
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
  }

  export interface Core {
    core: string;
    legs: boolean;
    flight: number;
    reused: boolean;
    landpad: string | null;
    gridfins: boolean;
    landing_type: string | null;
    landing_attempt: boolean;
    landing_success: boolean | null;
  }
  