interface ImageUrls {
  icon_url: string;
  medium_url: string;
  screen_url: string;
  screen_large_url: string;
  small_url: string;
  super_url: string;
  thumb_url: string;
  tiny_url: string;
  original_url: string;
}

interface Rating {
  api_detail_url?: string;
  id: number;
  name: string;
}

interface Platform {
  id: number;
  name: string;
  abbreviation: string;
}

interface Genre {
  id: number;
  name: string;
}

interface RelatedGame {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
}

interface Developer {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
}

export interface GameApi {
  id: number;
  guid: string;
  name: string;
  deck: string;
  image: ImageUrls;
  original_game_rating?: Rating[] | null;
  original_release_date?: string;
  platforms: Platform[];
  genres: Genre[];
  similar_games?: RelatedGame[];
  developers: Developer[];
  createdAt: string;
  updatedAt: string;
  listId: number;
}
