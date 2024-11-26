export interface Game {
  id: number;
  guid: string;
  name: string;
  description: string;
  image: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
  };
  deck: string;
  original_game_rating: {
    id: number;
    name: string;
  };
  original_release_date: string;
  platforms: Array<{
    id: number;
    name: string;
    abbreviation: string;
  }>;
  genres: Array<{
    id: number;
    name: string;
  }>;
  similar_games: Array<{
    api_detail_url: string;
    id: number;
    name: string;
    site_detail_url: string;
  }>;
  developers: Array<{
    api_detail_url: string;
    id: number;
    name: string;
    site_detail_url: string;
  }>;
  createdAt: string;
  updatedAt: string;
  listId: number;
}
