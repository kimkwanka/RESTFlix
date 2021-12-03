export interface IUser {
  data: {
    _id: string;
    birthday: string;
    email: string;
    favoriteMovies: number[];
    passwordHash: string;
    username: string;
  };
  isLoggedIn?: boolean;
  token: string;
}

export type TmdbMovieSimple = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: string[];
  id: number;
  original_language: boolean;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbMovieDetailed = {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: TmdbGenre[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language: boolean;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime?: number;
  status: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TmdbCast = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: number;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type TmdbCrew = {
  adult: boolean;
  credit_id: number;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type TmdbCredits = {
  id: number;
  cast: TmdbCast[];
  crew: TmdbCrew[];
};

export type TmdbConfiguration = {
  __typename?: 'TMDBConfiguration';
  backdrop_sizes: string[];
  base_url: string;
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  secure_base_url: string;
  still_sizes: string[];
};

export type TmdbImageBaseUrls = {
  posterBaseUrl: string;
  profileBaseUrl: string;
  backdropBaseUrl: string;
};

// Dependency cycle is ok here since TypeScript compiler can correctly handle it for types.
// (Check https://redux-toolkit.js.org/tutorials/typescript#application-usage for more details)

// eslint-disable-next-line import/no-cycle
export type { TRootState } from './store';
export type { TAppDispatch } from './store';
