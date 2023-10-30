export interface IArtGalleryResponseConfig {
  iiif_url: string;
  website_url: string;
}

export interface IArtGalleryArtworkModel {
  id: number;
  api_model: string;
  api_link: string;
  is_boosted: false;
  title: string;
  alt_titles: null;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  } | null;
  main_reference_number: string;
  has_not_been_viewed_much: false;
  boost_rank: null;
  date_start: number;
  date_end: number;
  date_display: string;
  date_qualifier_title: string;
  date_qualifier_id: null;
  artist_display: string;
  place_of_origin: string;
  description: null;
  dimensions: string;
  dimensions_detail: [
    {
      depth_cm: number;
      depth_in: number;
      width_cm: number;
      width_in: number;
      height_cm: number;
      height_in: number;
      diameter_cm: number;
      diameter_in: number;
      clarification: null;
    },
  ];
  medium_display: string;
  inscriptions: null;
  credit_line: string;
  catalogue_display: null;
  publication_history: string;
  exhibition_history: string;
  provenance_text: string;
  edition: null;
  publishing_verification_level: string;
  internal_department_id: number;
  fiscal_year: null;
  fiscal_year_deaccession: null;
  is_public_domain: false;
  is_zoomable: true;
  max_zoom_window_size: number;
  copyright_notice: string;
  has_multimedia_resources: false;
  has_educational_resources: false;
  has_advanced_imaging: false;
  colorfulness: number;
  color: {
    h: number;
    l: number;
    s: number;
    percentage: number;
    population: number;
  };
  latitude: null;
  longitude: null;
  latlon: null;
  is_on_view: false;
  on_loan_display: string;
  gallery_title: null;
  gallery_id: null;
  nomisma_id: null;
  artwork_type_title: string;
  artwork_type_id: number;
  department_title: string;
  department_id: string;
  artist_id: number;
  artist_title: string;
  alt_artist_ids: [];
  artist_ids: Array<number>;
  artist_titles: Array<string>;
  category_ids: Array<string>;
  category_titles: Array<string>;
  term_titles: Array<string>;
  style_id: null;
  style_title: null;
  alt_style_ids: [];
  style_ids: [];
  style_titles: [];
  classification_id: string;
  classification_title: string;
  alt_classification_ids: Array<string>;
  classification_ids: Array<string>;
  classification_titles: Array<string>;
  subject_id: null;
  alt_subject_ids: [];
  subject_ids: [];
  subject_titles: [];
  material_id: string;
  alt_material_ids: Array<string>;
  material_ids: Array<string>;
  material_titles: Array<string>;
  technique_id: null;
  alt_technique_ids: [];
  technique_ids: [];
  technique_titles: [];
  theme_titles: [];
  image_id: string;
  alt_image_ids: [];
  document_ids: [];
  sound_ids: [];
  video_ids: [];
  text_ids: [];
  section_ids: [];
  section_titles: [];
  site_ids: [];
  suggest_autocomplete_all: [
    {
      input: Array<string>;
      contexts: {
        groupings: Array<string>;
      };
    },
    {
      input: Array<string>;
      weight: number;
      contexts: {
        groupings: Array<string>;
      };
    },
  ];
  source_updated_at: string;
  updated_at: string;
  timestamp: string;
}

export interface IArtGalleryResponseInfo {
  license_text: string;
  license_links: Array<string>;
  version: number;
}

export interface IArtGalleryResponsePagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}

export interface IArtGalleryResponseAll {
  config: IArtGalleryResponseConfig;
  data: Array<IArtGalleryArtworkModel>;
  info: IArtGalleryResponseInfo;
  pagination: IArtGalleryResponsePagination;
}

export interface IArtGallerySearchDataDefault {
  _score: number;
  thumbnail: {
    alt_text: string;
    width: number;
    lqip: string;
    height: number;
  } | null;
  api_model: string;
  is_boosted: boolean;
  api_link: string;
  id: number;
  title: string;
  image_id: string;
  timestamp: string;
}

export interface IArtGallerySearchData {
  _score: number;
  thumbnail: {
    alt_text: string;
    width: number;
    lqip: string;
    height: number;
  };
  id: number;
  title: string;
  image_id: string;
  artist_display: string;
  artwork_type_title: string;
  date_display: string;
}

export interface IArtGalleryResponseSearch {
  preference: object | null;
  pagination: IArtGalleryResponsePagination;
  data: Array<IArtGallerySearchData>;
  info: IArtGalleryResponseInfo;
  config: IArtGalleryResponseConfig;
}
