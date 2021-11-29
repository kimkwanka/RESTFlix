export interface IUser {
  data: {
    _id: string;
    birthday: string;
    email: string;
    favoriteMovies: string[];
    passwordHash: string;
    username: string;
  };
  isLoggedIn?: boolean;
  token: string;
}

export type TmdbMovieSimple = {
  adult: boolean;
  backdrop_path: string;
  backdropUrl: string;
  genre_ids: string[];
  id: string;
  original_language: boolean;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  posterUrl: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
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

// Dependency cycle is ok here since TypeScript compiler can correctly handle it for types.
// (Check https://redux-toolkit.js.org/tutorials/typescript#application-usage for more details)

// eslint-disable-next-line import/no-cycle
export type { TRootState } from './store';
export type { TAppDispatch } from './store';
