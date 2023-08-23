interface Info {
  count: number;
  nextPage: string;
  previousPage: null | string;
  totalPages: number;
}

export interface FilmData {
  _id: number;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  sourceUrl: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  __v: number;
  isLiked: boolean;
}

export interface ServerResponse<T> {
  data: T[];
  info: Info;
}
