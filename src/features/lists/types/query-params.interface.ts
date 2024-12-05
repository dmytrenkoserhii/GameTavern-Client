// Base interface for all query parameters
export interface BaseQueryParams {
  sort: string;
  [key: string]: string | undefined;
}

// Filter-specific parameters
export interface FilterListRightBarData {
  releaseYear?: string;
  platform?: string;
}

// List-specific query parameters
export interface ListQueryParams extends BaseQueryParams, FilterListRightBarData {}
